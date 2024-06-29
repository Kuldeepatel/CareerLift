import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTachometerAlt, FaUser, FaClipboardList, FaCrown, FaTasks, FaCalendarCheck, FaSignOutAlt } from "react-icons/fa";
import profileImage from '../assets/Profile_icon.png';

const SideBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const employee = JSON.parse(localStorage.getItem('employee'));
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="w-[18%] h-screen fixed bg-white shadow-lg p-6 flex flex-col justify-between">
      {/* Logo Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-[20px] text-slate-500 font-semibold tracking-normal">
          CareerLIFT
        </h1>
      </div>

      {/* Profile Section */}
      <div className="flex flex-col items-center mb-5">
        <img
          src={employee?.ProfileImage || profileImage}
          alt="Profile"
          className="h-17 w-16 rounded-full cursor-pointer mb-2"
          onClick={() => handleNavigation("/profile")}
        />
        <p className="text-mm text-gray-500">{employee ? `${employee.FirstName} ${employee.LastName}` : 'Profile'}</p>
      </div>

      {/* Sidebar links */}
      <div className="flex flex-col gap-1 flex-grow">
        <div
          className={`flex p-3 rounded items-center cursor-pointer hover:bg-indigo-600 hover:text-white transition ease-in-out delay-75 ${
            location.pathname === "/" ? "bg-indigo-600 text-white" : ""
          }`}
          onClick={() => handleNavigation("/hrdashboard")}
        >
          <FaTachometerAlt className="mr-3" />
          <p className="text-lg font-medium">Dashboard</p>
        </div>

        <div
          className={`flex p-3 rounded items-center cursor-pointer hover:bg-indigo-600 hover:text-white transition ease-in-out delay-75 ${
            location.pathname === "/attendance" ? "bg-indigo-600 text-white" : ""
          }`}
          onClick={() => handleNavigation("/attendance")}
        >
          <FaCalendarCheck className="mr-3" />
          <p className="text-lg font-medium">Attendance</p>
        </div>

        <div
          className={`flex p-3 rounded items-center cursor-pointer hover:bg-indigo-600 hover:text-white transition ease-in-out delay-75 ${
            location.pathname === "/employee" ? "bg-indigo-600 text-white" : ""
          }`}
          onClick={() => handleNavigation("/employee")}
        >
          <FaUser className="mr-3" />
          <p className="text-lg font-medium">Employee</p>
        </div>

        <div
          className={`flex p-3 rounded items-center cursor-pointer hover:bg-indigo-600 hover:text-white transition ease-in-out delay-75 ${
            location.pathname === "/leave" ? "bg-indigo-600 text-white" : ""
          }`}
          onClick={() => handleNavigation("/leave")}
        >
          <FaClipboardList className="mr-3" />
          <p className="text-lg font-medium">Leave Application</p>
        </div>

        <div
          className={`flex p-3 rounded items-center cursor-pointer hover:bg-indigo-600 hover:text-white transition ease-in-out delay-75 ${
            location.pathname === "/leader" ? "bg-indigo-600 text-white" : ""
          }`}
          onClick={() => handleNavigation("/promotionranking")}
        >
          <FaCrown className="mr-3" />
          <p className="text-lg font-medium">Leaderboard</p>
        </div>

        <div
          className={`flex p-3 rounded items-center cursor-pointer hover:bg-indigo-600 hover:text-white transition ease-in-out delay-75 ${
            location.pathname === "/task" ? "bg-indigo-600 text-white" : ""
          }`}
          onClick={() => handleNavigation("/task")}
        >
          <FaTasks className="mr-3" />
          <p className="text-lg font-medium">Task Management</p>
        </div>
      </div>

      {/* Logout Button */}
      <div
        className="flex p-3 rounded items-center cursor-pointer bg-indigo-600 text-white transition ease-in-out delay-75"
        onClick={() => handleNavigation("/logout")}
      >
        <FaSignOutAlt className="mr-3" />
        <p className="text-lg font-medium">Log out</p>
      </div>
    </div>
  );
};

export default SideBar;
