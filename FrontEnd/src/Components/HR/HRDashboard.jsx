import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideBar from '../SideBar';
import { useLocation } from 'react-router-dom';

const HRDashboard = () => {
  const location = useLocation();
  const employee = location.state?.data;
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().substr(0, 10)); 
  const [totalPresent, setTotalPresent] = useState(0); 
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [totalEmployee, setTotalEmployee] = useState(0); 
  

  // for count toatl presnt and absent 
  useEffect(() => {
    axios.get(`http://localhost:8000/api/v1/employee/attendance/${selectedDate}`)
    .then(response => {
      const { presentCount, absentCount } = response.data;
      setTotalPresent(presentCount);
      setTotalAbsent(absentCount);
      setTotalEmployee(presentCount + absentCount); // Update total employees count
    })
    .catch(error => {
      console.error("Error fetching attendance data for the selected date:", error);
      toast.error('Failed to fetch attendance data');
    });
  },[selectedDate]);

  

  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow p-6 ml-72">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white shadow-xl p-6 rounded-lg w-64 h-32">
            <h2 className="text-xl font-semibold mb-2 flex items-center justify-center">Total Employees</h2>
            <p className="text-3xl flex items-center justify-center">{totalEmployee}</p>
          </div>
          <div className="bg-white shadow-xl p-6 rounded-lg w-64 h-32">
            <h2 className="text-xl font-semibold mb-2 flex items-center justify-center">Present Employees</h2>
            <p className="text-3xl flex items-center justify-center">{totalPresent}</p>
          </div>
          <div className="bg-white shadow-xl p-6 rounded-lg w-64 h-32">
            <h2 className="text-xl font-semibold mb-2 flex items-center justify-center">Absent Employees</h2>
            <p className="text-3xl flex items-center justify-center">{totalAbsent}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRDashboard;
