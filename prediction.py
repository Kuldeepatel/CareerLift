import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression

# Set seed for reproducibility
np.random.seed(42)

# Define the number of months for historical and prediction data
months_past = 12
months_future = 6

# Generate synthetic data for past 12 months
employee_data = {
    'Month': np.arange(1, months_past + 1),
    'Total_Projects': np.random.randint(5, 11, size=months_past),
    'Projects_Completed': np.random.randint(1, 6, size=months_past),
    'Attendance_Rate': np.random.uniform(70, 100, size=months_past),
    'Performance_Score': np.random.randint(1, 6, size=months_past)
}

# Create DataFrame
df_employee = pd.DataFrame(employee_data)

# Ensure Projects_Completed does not exceed Total_Projects
df_employee['Projects_Completed'] = df_employee.apply(
    lambda row: min(row['Projects_Completed'], row['Total_Projects']), axis=1
)

# Calculate Completion Percentage
df_employee['Completion_Percentage'] = (df_employee['Projects_Completed'] / df_employee['Total_Projects']) * 100

# Prepare features (Month) and target variables for regression
X = df_employee[['Month']]
y_completion = df_employee['Completion_Percentage']
y_attendance = df_employee['Attendance_Rate']
y_performance = df_employee['Performance_Score']

# Train linear regression models
model_completion = LinearRegression().fit(X, y_completion)
model_attendance = LinearRegression().fit(X, y_attendance)
model_performance = LinearRegression().fit(X, y_performance)

# Predict future months
future_months = np.arange(months_past + 1, months_past + months_future + 1).reshape(-1, 1)
predictions_completion = model_completion.predict(future_months)
predictions_attendance = model_attendance.predict(future_months)
predictions_performance = model_performance.predict(future_months)

# Create DataFrame for future months
df_future = pd.DataFrame({
    'Month': future_months.flatten(),
    'Predicted_Completion_Percentage': predictions_completion,
    'Predicted_Attendance_Rate': predictions_attendance,
    'Predicted_Performance_Score': predictions_performance
})

# Plotting
plt.figure(figsize=(14, 8))

# Plot Completion Percentage
plt.subplot(3, 1, 1)
plt.plot(df_employee['Month'], df_employee['Completion_Percentage'], marker='o', label='Historical Completion Percentage', color='b')
plt.plot(df_future['Month'], df_future['Predicted_Completion_Percentage'], marker='o', linestyle='--', label='Predicted Completion Percentage', color='r')
plt.xlabel('Month')
plt.ylabel('Completion Percentage (%)')
plt.title('Project Completion Percentage')
plt.legend()
plt.grid(True)

# Plot Attendance Rate
plt.subplot(3, 1, 2)
plt.plot(df_employee['Month'], df_employee['Attendance_Rate'], marker='o', label='Historical Attendance Rate', color='g')
plt.plot(df_future['Month'], df_future['Predicted_Attendance_Rate'], marker='o', linestyle='--', label='Predicted Attendance Rate', color='orange')
plt.xlabel('Month')
plt.ylabel('Attendance Rate (%)')
plt.title('Attendance Rate')
plt.legend()
plt.grid(True)

# Plot Performance Score
plt.subplot(3, 1, 3)
plt.plot(df_employee['Month'], df_employee['Performance_Score'], marker='o', label='Historical Performance Score', color='purple')
plt.plot(df_future['Month'], df_future['Predicted_Performance_Score'], marker='o', linestyle='--', label='Predicted Performance Score', color='cyan')
plt.xlabel('Month')
plt.ylabel('Performance Score (Out of 5)')
plt.title('Performance Score')
plt.legend()
plt.grid(True)

plt.tight_layout()
plt.show()
