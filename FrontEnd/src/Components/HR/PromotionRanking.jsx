import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeSidebar from '../Employee/EmployeeSidebar'
import EmployeeTopbar from '../Employee/EmployeeSidebar'

const PromotionRanking = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from the backend
    axios.get('http://localhost:8000/api/v1/predict/promotionranking')
      .then(response => {
        const fetchedEmployees = response.data;
        // Sort employees by PromotionScore in descending order
        const sortedEmployees = fetchedEmployees.sort((a, b) => b.PromotionScore - a.PromotionScore);
        setEmployees(sortedEmployees);
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  return (
    <>
    <EmployeeSidebar/>
    <EmployeeTopbar/>
      <div className="ml-72 p-6">
        <h1 className="text-2xl font-bold text-center mb-8 mt-8">Employee Promotion Ranking</h1>
        <div className="grid gap-6">
          {employees.map(employee => (
            <div key={employee.EmployeeID} className="flex items-center p-5 bg-white shadow-lg rounded-lg border border-gray-200 mb-4">
              <img src={employee.ProfileImage} alt={`${employee.FirstName} ${employee.LastName}'s profile`} className="w-16 h-16 rounded-full mr-4 border border-gray-300"/>
              <div className="flex-1">
                <p className="text-xl font-semibold text-gray-800">{employee.FirstName} {employee.LastName}</p>
                <p className="text-sm text-gray-500">Employee ID: {employee.EmployeeID}</p>
              </div>
              <div>
                <p className="text-lg">{employee.Promotion}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PromotionRanking;
