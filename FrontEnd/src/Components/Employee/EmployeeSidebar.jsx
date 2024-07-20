import React, { useState } from "react";
import { RiDashboardLine } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
// import { CgChart } from "react-icons/cg";
import { PiCheckSquareOffset } from "react-icons/pi";
import { IoPeopleOutline } from "react-icons/io5";
// import { HiOutlineNewspaper } from "react-icons/hi2";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GoTasklist } from "react-icons/go";
// import { FaChevronDown } from "react-icons/fa";
import { FiAlignJustify } from "react-icons/fi";

const Sidebar = () => {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [profileSubmenu, setProfileSubmenu] = useState(false);

  const handleSidebarToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const handleProfileSubmenuToggle = () => {
    setProfileSubmenu(!profileSubmenu);
  };

  return (
    <div className={`flex flex-col h-screen fixed bg-white shadow-lg p-1 z-30 transition-all duration-300 ${isExpanded ? 'w-[18%]' : 'w-[5%]'}`}>
      <div className="flex mb-6 cursor-pointer" onClick={handleSidebarToggle}>
        <h1 className="text-[20px] text-slate-500 mt-[-10px] font-semibold tracking-normal flex gap-2 items-center">
          <FiAlignJustify className="mt-4 ml-2.5 size-8"/>
          {/* {isExpanded && <p>CarrerLIFT</p>} */}
        </h1>
      </div>

      <Link to="/employeedashboard" className={`flex p-3 rounded gap-4 mb-1 items-center hover:bg-[#1B67D9] hover:text-white transition ease-in-out delay-75 ${location.pathname === "/employeedashboard" ? "bg-[#1B67D9] text-white" : ""}`}>
        <RiDashboardLine className={`text-xl size-6 opacity-70 ${location.pathname === "/employeedashboard" ? "text-white opacity-100" : ""}`} />
        {isExpanded && <p className={`text-1xl tracking-wider ${location.pathname === "/employeedashboard" ? "text-white" : ""}`}>Dashboard</p>}
      </Link>

      <Link to="/attendance" className={`flex p-3 rounded gap-4 mb-1 items-center hover:bg-[#1B67D9] hover:text-white transition ease-in-out delay-75 ${location.pathname === "/attendance" ? "bg-[#1B67D9] text-white" : ""}`}>
        <PiCheckSquareOffset className={`text-xl size-6 ${location.pathname === "/attendance" ? "text-white" : ""}`} />
        {isExpanded && <p className={`text-1xl tracking-wider ${location.pathname === "/attendance" ? "text-white" : ""}`}>Attendance</p>}
      </Link>

      <Link to="/employee" className={`flex p-3 rounded gap-4 mb-1 items-center hover:bg-[#1B67D9] hover:text-white transition ease-in-out delay-75 ${location.pathname === "/employee" ? "bg-[#1B67D9] text-white" : ""}`}>
        <IoPeopleOutline className={`text-xl size-6 ${location.pathname === "/employee" ? "text-white" : ""}`} />
        {isExpanded && <p className={`text-1xl tracking-wider ${location.pathname === "/employee" ? "text-white" : ""}`}>EmployeeList</p>}
      </Link>

      {/* <Link to="/leave" className={`flex p-3 rounded gap-4 mb-1 items-center hover:bg-[#1B67D9] hover:text-white transition ease-in-out delay-75 ${location.pathname === "/leave" ? "bg-[#1B67D9] text-white" : ""}`}>
        <HiOutlineNewspaper className={`text-xl size-6 ${location.pathname === "/leave" ? "text-white" : ""}`} />
        {isExpanded && <p className={`text-1xl tracking-wider ${location.pathname === "/leave" ? "text-white" : ""}`}>Leave Application</p>}
      </Link> */}

      <Link to="/promotionranking" className={`flex p-3 rounded gap-4 mb-1 items-center hover:bg-[#1B67D9] hover:text-white transition ease-in-out delay-75 ${location.pathname === "/promotionranking" ? "bg-[#1B67D9] text-white" : ""}`}>
        <MdOutlineLeaderboard className={`text-xl size-6 opacity-70 ${location.pathname === "/promotionranking" ? "text-white opacity-100" : ""}`} />
        {isExpanded && <p className={`text-1xl tracking-wider ${location.pathname === "/promotionranking" ? "text-white" : ""}`}>Leaderboard</p>}
      </Link>

      <Link to="/task" className={`flex p-3 rounded gap-4 mb-1 items-center hover:bg-[#1B67D9] hover:text-white transition ease-in-out delay-75 ${location.pathname === "/task" ? "bg-[#1B67D9] text-white" : ""}`}>
        <GoTasklist className={`text-xl size-6 ${location.pathname === "/task" ? "text-white" : ""}`} />
        {isExpanded && <p className={`text-1xl tracking-wider ${location.pathname === "/task" ? "text-white" : ""}`}>Task Management</p>}
      </Link>

      {/* <Link to="/chats/:employeeID" className={`flex p-3 rounded gap-4 mb-1 items-center hover:bg-[#1B67D9] hover:text-white transition ease-in-out delay-75 ${location.pathname === "/chats/:employeeID" ? "bg-[#1B67D9] text-white" : ""}`}>
        <GoTasklist className={`text-xl size-6 ${location.pathname === "/chats/:employeeID" ? "text-white" : ""}`} />
        {isExpanded && <p className={`text-1xl tracking-wider ${location.pathname === "/chats/:employeeID" ? "text-white" : ""}`}>Chats</p>}
      </Link> */}

      {/* Employee Profile with Submenu */}
      {/* <div className={`flex flex-col p-3 rounded gap-4 mb-1 cursor-pointer hover:bg-[#1B67D9] hover:text-white transition ease-in-out delay-75 ${location.pathname.startsWith("/profile") ? "bg-[#1B67D9] text-white" : ""}`} onClick={handleProfileSubmenuToggle}>
        <IoPeopleOutline className={`text-xl size-6 ${location.pathname.startsWith("/profile") ? "text-white" : ""}`} />
        {isExpanded && (
          <>
            <div className="flex justify-between w-full items-center">
              <p className={`text-1xl tracking-wider ${location.pathname.startsWith("/profile") ? "text-white" : ""}`}>Profile</p>
              <FaChevronDown className={`transition-transform size-4 ${profileSubmenu ? "rotate-180" : ""}`} />
            </div>
            {profileSubmenu && (
              <div className="ml-8 mt-2 flex flex-col gap-2">
                <Link to="/profile/passwords" className={`flex p-2 rounded gap-4 items-center hover:bg-[#1B67D9] hover:text-white ${location.pathname === "/profile/passwords" ? "bg-[#1B67D9] text-white" : ""}`}>
                  <p className="text-sm">Passwords</p>
                </Link>
                <Link to="/profile/mail" className={`flex p-2 rounded gap-4 items-center hover:bg-[#1B67D9] hover:text-white ${location.pathname === "/profile/mail" ? "bg-[#1B67D9] text-white" : ""}`}>
                  <p className="text-sm">Mail</p>
                </Link>
                <Link to="/profile/accounts" className={`flex p-2 rounded gap-4 items-center hover:bg-[#1B67D9] hover:text-white ${location.pathname === "/profile/accounts" ? "bg-[#1B67D9] text-white" : ""}`}>
                  <p className="text-sm">Accounts</p>
                </Link>
              </div>
            )}
          </>
        )}
      </div> */}

      <div className="flex p-3 rounded items-center absolute bottom-3 w-[85%] cursor-pointer gap-4 mb-1 bg-[#1B67D9] text-white transition ease-in-out delay-75">
        <TbLogout className="text-xl bg-[#1B67D9]" />
        {isExpanded && <p className="text-1xl tracking-widest">Log out</p>}
      </div>
    </div>
  );
};

export default Sidebar;
