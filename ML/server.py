from flask import Flask, jsonify
import pandas as pd
import joblib
from pymongo import MongoClient

app = Flask(__name__)

# Load the pre-trained model and scaler
model = joblib.load('promotion_model.pkl')
scaler = joblib.load('scaler.pkl')

# MongoDB setup
client = MongoClient('mongodb+srv://patelkuldip1308:1234@cluster0.8i4r1aj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['test']  # Replace 'test' with your actual database name
employee_collection = db['employees']  # Replace 'employees' with your actual collection name
promotion_rating_collection = db['promotions']  # Collection to store predictions

# Set fixed min and max scores for normalization
min_score = 0  # Adjust based on expected minimum score
max_score = 100  # Adjust based on expected maximum score

# Set target min and max scores
min_normalized = 7
max_normalized = 10

@app.route('/predict-all-employees', methods=['GET'])
def predict_all_employees():
    try:
        # Fetch employee data from MongoDB
        employees = employee_collection.find()
        predictions = []
        
        for employee in employees:
            # Remove '_id' field if present
            employee_data = {key: employee[key] for key in employee if key != '_id'}
            
            # Convert employee data to DataFrame
            employee_df = pd.DataFrame([employee_data], columns=[
                'PerformanceScore', 'ProjectsCompleted', 'ProjectsDue', 
                'TechnicalSkillsScore', 'SoftSkillsScore', 'TrainingProgramsCompleted', 
                'Attendance', 'YearsWithCompany', 'YearsInIndustry'
            ])
            
            # Ensure all columns are present in the DataFrame
            for col in ['PerformanceScore', 'ProjectsCompleted', 'ProjectsDue', 
                        'TechnicalSkillsScore', 'SoftSkillsScore', 'TrainingProgramsCompleted', 
                        'Attendance', 'YearsWithCompany', 'YearsInIndustry']:
                if col not in employee_df.columns:
                    employee_df[col] = 0

            # Reorder columns to match the model's expected input
            employee_df = employee_df[['PerformanceScore', 'ProjectsCompleted', 'ProjectsDue', 
                                       'TechnicalSkillsScore', 'SoftSkillsScore', 'TrainingProgramsCompleted', 
                                       'Attendance', 'YearsWithCompany', 'YearsInIndustry']]
            
            # Scale features
            employee_df_scaled = scaler.transform(employee_df)
            
            # Predict
            prediction = model.predict(employee_df_scaled)
            
            result = 'Yes' if prediction[0] == 'Yes' else 'No'
            
            # Calculate PromotionScore
            attributes = employee_data
            promotion_score = (
                (0.2 * attributes.get('PerformanceScore', 0)) +
                (0.15 * attributes.get('ProjectsCompleted', 0)) +
                (-0.10 * attributes.get('ProjectsDue', 0)) +
                (0.10 * attributes.get('TechnicalSkillsScore', 0)) +
                (0.15 * attributes.get('SoftSkillsScore', 0)) +
                (0.1 * attributes.get('TrainingProgramsCompleted', 0)) +
                (0.1 * attributes.get('Attendance', 0)) +
                (0.05 * attributes.get('YearsWithCompany', 0)) +
                (0.05 * attributes.get('YearsInIndustry', 0))
            )
            
            # Normalize PromotionScore to be between 7 and 10
            promotion_score = (promotion_score - min_score) / (max_score - min_score) * (max_normalized - min_normalized) + min_normalized
            
            # Clamp PromotionScore to a maximum of 10 and minimum of 7
            promotion_score = min(max(promotion_score, min_normalized), max_normalized)
            
            # Round PromotionScore to 2 decimal places
            promotion_score = round(promotion_score, 2)
            
            # Update existing document or insert a new one
            promotion_rating_collection.update_one(
                {'EmployeeID': employee.get('EmployeeID')},  # Query to find the existing document
                {'$set': {
                    'Prediction': result,
                    'PromotionScore': promotion_score,
                    'FirstName' : employee.get('FirstName'),
                    'LastName' : employee.get('LastName'),
                    'profileImage' : employee.get('profileImage'),
                    'Email' : employee.get('Email')
                }},
                upsert=True  # Create a new document if no match is found
            )
            
            predictions.append({
                'EmployeeID': employee.get('EmployeeID'),
                'Prediction': result,
                'PromotionScore': promotion_score,
                
            })
        
        return jsonify({'Predictions': predictions})
    
    except Exception as e:
        print(f"Error: {e}")  # Print error for debugging
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
