from flask import Flask, jsonify
import pandas as pd
import joblib
from pymongo import MongoClient

app = Flask(__name__)

# Load  model
model = joblib.load('promotion_model.pkl')
scaler = joblib.load('scaler.pkl')

# MongoDB Connection
client = MongoClient('mongodb+srv://patelkuldip1308:1234@cluster0.8i4r1aj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
db = client['test']  
employee_collection = db['employees']  
promotion_rating_collection = db['promotions']  


min_score = 0  # Adjust based on expected minimum score
max_score = 100  # Adjust based on expected maximum score


min_normalized = 7
max_normalized = 10

@app.route('/predict-all-employees', methods=['GET'])
def predict_all_employees():
    try:
        # Fetch employee data 
        employees = employee_collection.find()
        predictions = []
        for employee in employees:
            employee_data = {key: employee[key] for key in employee if key != '_id'}
            
            employee_df = pd.DataFrame([employee_data], columns=[
                'PerformanceScore', 'ProjectsCompleted', 'ProjectsDue', 
                'TechnicalSkillsScore', 'SoftSkillsScore', 'TrainingProgramsCompleted', 
                'Attendance', 'YearsWithCompany', 'YearsInIndustry'
            ])
            
            for col in ['PerformanceScore', 'ProjectsCompleted', 'ProjectsDue', 
                        'TechnicalSkillsScore', 'SoftSkillsScore', 'TrainingProgramsCompleted', 
                        'Attendance', 'YearsWithCompany', 'YearsInIndustry']:
                if col not in employee_df.columns:
                    employee_df[col] = 0

            employee_df = employee_df[['PerformanceScore', 'ProjectsCompleted', 'ProjectsDue', 
                                       'TechnicalSkillsScore', 'SoftSkillsScore', 'TrainingProgramsCompleted', 
                                       'Attendance', 'YearsWithCompany', 'YearsInIndustry']]
            
            employee_df_scaled = scaler.transform(employee_df)
            
            prediction = model.predict(employee_df_scaled)
            
            result = 'Yes' if prediction[0] == 'Yes' else 'No'
            
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
            
            promotion_score = (promotion_score - min_score) / (max_score - min_score) * (max_normalized - min_normalized) + min_normalized
            
            promotion_score = min(max(promotion_score, min_normalized), max_normalized)
            promotion_score = round(promotion_score, 2)
            
            promotion_rating_collection.update_one(
                {'EmployeeID': employee.get('EmployeeID')},  
                {'$set': {
                    'Prediction': result,
                    'PromotionScore': promotion_score,
                    'FirstName' : employee.get('FirstName'),
                    'LastName' : employee.get('LastName'),
                    'profileImage' : employee.get('profileImage'),
                    'Email' : employee.get('Email')
                }},
                upsert=True  
            )
            
            predictions.append({
                'EmployeeID': employee.get('EmployeeID'),
                'Prediction': result,
                'PromotionScore': promotion_score,
                
            })
        
        return jsonify({'Predictions': predictions})
    
    except Exception as e:
        print(f"Error: {e}")  
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
