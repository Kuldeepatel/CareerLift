import sys
import json
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

def train_model(data_path):
    
    # load csv data
    df = pd.read_csv(data_path)
    
    # change categorical Education data into numerical data
    
    education_mapping = {'B.Tech':0, 'M.Tech':1, 'PhD':2,'MBA':1,'BBA':0,'BSC':0,'MSC':1}
    df['Qualifications'] = df['Qualifications'].replace(education_mapping)
    
    # drop missing data
    df.dropna(inplace=True)
    
    X = df.drop(columns=['promoted'])
    y = df['promoted']
    
    # Split data into training and testing 
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Standardize features
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    # Train logistic regression model
    model = LogisticRegression(max_iter=1000)
    model.fit(X_train_scaled, y_train)
    
    return model, scaler

def predict_new_data(model, new_data, scaler):
    # Transform new data using scaler
    new_data_columns = ['Age','Qualifications','Tasks_completed', 'Due_tasks', 'Awards', 'Experience','AttendancePercentage']
    new_data_df = pd.DataFrame([new_data], columns=new_data_columns)
    new_data_scaled = scaler.transform(new_data_df)
    
    # Predict using the trained model
    predictions = model.predict(new_data_scaled)
    
    return predictions

if __name__ == "__main__":
    # Read attribute values from stdin
    attribute_values = json.loads(sys.stdin.readline())
    
    # Example data path and target attribute
    data_path = sys.argv[1]
    
    # Train the model
    trained_model, scaler = train_model(data_path)
    
    # Predict using the trained model
    predictions = predict_new_data(trained_model, attribute_values, scaler)
    
    # Print predictions as JSON
    print(json.dumps(predictions.tolist()))
