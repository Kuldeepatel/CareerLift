import React, { useState, useEffect, useRef } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import { GiProgression } from 'react-icons/gi';

const EmployeeTopbar = ({ bgColor = "bg-white" }) => {
  const [dropDown, setDropDown] = useState(false);
  const dropdownRef = useRef(null);
  const [employee, setEmployee] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedEmployee = localStorage.getItem('employee');
    if (storedEmployee) {
      const parsedEmployee = JSON.parse(storedEmployee);
      setEmployee(parsedEmployee); 
    }
  }, []);

  const toggle = () => {
    setDropDown(!dropDown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropDown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/v1/employee/logout', {}, {
        withCredentials: true // Ensure cookies are included
      });
      console.log(response);
      localStorage.removeItem('employee');
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div className='ml-0 '>
      <p className=' text-[20px] text-slate-500 mt-[12px] font-semibold  tracking-normal flex gap-2 items-center'><GiProgression className="text-[30px]" />Career lift</p>
      <div className={'flex w-full bg-white h-[50px] top-0 z-10 {bgColor} fixed ml-[70px]'}>
        <div className="flex items-center h-full absolute right-[100px] cursor-pointer" onClick={toggle}>
          <div className="flex gap-3 items-center">
            <FaUserCircle className="text-[45px] text-[#d9d9d9]"  />
            <p className="w-full mb-2 h-full flex items-center mt-2 text-slate-600 font-medium tracking-wide">{employee.FirstName} {employee.LastName}</p>
          </div>
        </div>

        {dropDown && (
          <div ref={dropdownRef} className="absolute flex top-[60px] flex-col p-2 w-[150px] transition bg-white rounded-md shadow-xl right-[310px]">
            <Link to='/employeedashboard' onClick={toggle} className='hover:bg-[#f2f2f2] p-2 rounded-md'>
              <p>Profile</p>
            </Link>
            <div onClick={handleLogout} className="hover:bg-[#f2f2f2] p-2 rounded-md cursor-pointer">
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeTopbar;