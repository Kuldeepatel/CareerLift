import React, { useState, useEffect } from 'react';
import EmployeeTopbar from '../Employee/EmployeeTopbar';
import Sidebar from '../Employee/EmployeeSidebar';

const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/employee/attendance');
        const data = await response.json();
        setEmployees(data); // Adjust based on actual API response structure
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(employee =>
    employee.EmployeeID.toString().toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='overflow-y-auto'>
      <Sidebar/>
      <EmployeeTopbar/>
      <div className="p-6 ml-[5%] bg-white min-h-screen relative">
        <div className="flex items-center justify-between pt-[1%] pb-[1%] border-gray-300">
          <h1 className="text-4xl border-l-[#1B67D9] border-l-4 rounded h-fit pl-4 text-slate-700">Employee List</h1>
        </div>
        <input
          type="text"
          placeholder="Search by ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border-2 mb-4 rounded-md right-6 absolute"
        />

        <div className="flex h-full w-full border-2 rounded-md mt-[80px]">
          <div className="h-full w-full">
            <div className="text-slate-800 rounded-lg">
              <div className="grid grid-cols-6 text-center p-4 border-b border font-bold">
                <div>Profile</div>
                <div>NAME</div>
                <div>EmployeeID</div>
                <div>Pending Task</div>
                <div>Task</div>
                <div className="ml-2">Attendance</div>
              </div>
              {filteredEmployees.map(employee => (
                <div key={employee.EmployeeID} className="grid bg-gray-100 hover:bg-gray-200 odd:bg-white grid-cols-6 text-center p-2 border-b border">
                  <div className="flex items-center justify-center gap-2">
                    <img src={employee.profileImage} alt={employee.FirstName} className="w-8 h-8 rounded-full" />
                    {employee.rank} {/* Ensure 'rank' is available or calculate if needed */}
                  </div>
                  <div>{employee.FirstName} {employee.LastName}</div>
                  <div>{employee.EmployeeID}</div>
                  <div>{employee.Due_tasks} {/* Placeholder for total time */}</div>
                  <div>{employee.Tasks_completed}</div>
                  <div>{employee.AttendancePercentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
