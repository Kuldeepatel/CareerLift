import React, { useState } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import { PiCheckSquareOffset } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
import { FiAlignJustify } from "react-icons/fi";

const Sidebar = ({ employeeID }) => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSidebarToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const menuItems = [
    { to: "/employeedashboard", icon: RiDashboardLine, text: "Dashboard" },
    { to: "/attendance", icon: PiCheckSquareOffset, text: "Attendance" },
    { to: "/employeelist", icon: IoPeopleOutline, text: "Employee List" },
    { to: "/profile", icon: SlCalender, text: "Employee SignUp" },
    { to: "/promotionranking", icon: MdOutlineLeaderboard, text: "Leaderboard" },
    { to: "/task", icon: GoTasklist, text: "Task Management" },
    { to: `/chats/${employeeID}`, icon: GoTasklist, text: "Chats" },
  ];

  return (
    <div className={`flex flex-col h-screen fixed bg-white shadow-lg p-1 z-30 transition-all duration-300 ${isExpanded ? 'w-[18%]' : 'w-[5%]'}`}>
      <div className="flex mb-6 cursor-pointer" onClick={handleSidebarToggle}>
        <h1 className="text-[20px] text-slate-500 mt-[-10px] font-semibold tracking-normal flex gap-2 items-center">
          <FiAlignJustify className="mt-4 ml-2.5 size-8" />
        </h1>
      </div>

      {menuItems.map((item, index) => (
        <Link
          key={index}
          to={item.to}
          className={`flex p-3 rounded gap-4 mb-1 items-center hover:bg-[#1B67D9] hover:text-white transition ease-in-out delay-75 ${location.pathname === item.to ? "bg-[#1B67D9] text-white" : ""}`}
        >
          <item.icon className={`text-xl size-6 ${location.pathname === item.to ? "text-white" : ""}`} />
          {isExpanded && <p className={`text-1xl tracking-wider ${location.pathname === item.to ? "text-white" : ""}`}>{item.text}</p>}
        </Link>
      ))}

      <div className="flex p-3 rounded items-center absolute bottom-3 w-[85%] cursor-pointer gap-4 mb-1 bg-[#1B67D9] text-white transition ease-in-out delay-75">
        <TbLogout className="text-xl bg-[#1B67D9]" />
        {isExpanded && <p className="text-1xl tracking-widest">Log out</p>}
      </div>
    </div>
  );
};

export default Sidebar;
