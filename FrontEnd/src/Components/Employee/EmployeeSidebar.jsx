import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RiDashboardLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";
import { PiCheckSquareOffset } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { HiOutlineNewspaper } from "react-icons/hi2";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { GiWeightLiftingUp } from "react-icons/gi";
import axios from 'axios';

const EmployeeSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [employeeID, setEmployeeID] = useState("");

  useEffect(() => {
    const storedEmployee = localStorage.getItem('employee');
    if (storedEmployee) {
      const employeeData = JSON.parse(storedEmployee);
      setEmployeeID(employeeData.EmployeeID);
    }
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post(`http://localhost:8000/api/v1/employee/logout`, {}, {
        withCredentials: true // Ensure cookies are included
      });
      console.log(response);
      localStorage.removeItem('employee');
      navigate('/');
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const menuItems = [
    { to: "/employeedashboard", icon: RiDashboardLine, text: "Dashboard" },
    { to: "/attendance", icon: PiCheckSquareOffset, text: "Attendance" },
    { to: "/employee", icon: IoPeopleOutline, text: "Employee" },
    { to: "/leave", icon: HiOutlineNewspaper, text: "Leave Application" },
    { to: "/promotionranking", icon: MdOutlineLeaderboard, text: "Leaderboard" },
    { to: "/task", icon: GoTasklist, text: "Task Management" },
    { to: "/demo", icon: GoTasklist, text: "Demo" },
    { to: `/chats/${employeeID}`, icon: GoTasklist, text: "Chats" },
  ];

  return (
    <div className="flex w-[18%] h-screen fixed bg-white shadow-lg flex-col p-6 top-0">
      <div className="flex mb-6">
        <h1 className="text-[20px] text-slate-500 mt-[-10px] font-semibold tracking-normal flex gap-2 items-center">
          <GiWeightLiftingUp className="text-[30px]" />
          <p>CareerLIFT</p>
        </h1>
      </div>

      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className={`flex p-3 rounded gap-4 mb-1 items-center hover:bg-[#7E3AF2] hover:text-white transition ease-in-out delay-75 ${
            location.pathname === item.to ? "bg-[#7E3AF2] text-white" : ""
          }`}
        >
          <item.icon
            className={`text-xl ${
              location.pathname === item.to ? "text-white" : ""
            }`}
          />
          <p
            className={`text-1xl tracking-wider ${
              location.pathname === item.to ? "text-white" : ""
            }`}
          >
            {item.text}
          </p>
        </Link>
      ))}

      <div className="flex p-3 rounded items-center absolute bottom-3 w-[85%] cursor-pointer gap-4 mb-1 bg-[#7E3AF2] text-white transition ease-in-out delay-75">
        <TbLogout className="text-xl bg-[#7E3AF2]" />
        <p className="text-1xl tracking-widest" onClick={handleLogout}>Log out</p>
      </div>
    </div>
  );
};

export default EmployeeSidebar;
