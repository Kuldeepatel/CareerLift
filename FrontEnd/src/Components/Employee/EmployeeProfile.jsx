import React, { useState, useEffect } from "react";
import { FaPhoneAlt, FaIdCard, FaTasks } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { GiShieldOpposition, GiProgression } from "react-icons/gi";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { SlGraph } from "react-icons/sl";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import axios from 'axios';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeTopbar from './EmployeeTopbar';

// Register necessary components for ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [greeting, setGreeting] = useState("Good Morning");
  const [loading, setLoading] = useState(true);
  const [pendingTasks, setPendingTasks] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const storedEmployee = localStorage.getItem('employee');
        if (storedEmployee) {
          const parsedEmployee = JSON.parse(storedEmployee);
          const response = await axios.get(`http://localhost:8000/api/v1/employee/${parsedEmployee.EmployeeID}`);
          setEmployee(response.data);
          const tasksResponse = await axios.get(`http://localhost:8000/api/v1/task/${parsedEmployee.EmployeeID}`);
          setPendingTasks(tasksResponse.data);
        }
      } catch (error) {
        console.error("Error during fetching Employee Data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, []);
  
  useEffect(() => {
    const getGreeting = () => {
      const currentHour = new Date().getHours();
      if (5 <= currentHour && currentHour < 12) {
        return "Good Morning";
      } else if (12 <= currentHour && currentHour < 18) {
        return "Good Afternoon";
      } else if (18 <= currentHour && currentHour < 22) {
        return "Good Evening";
      } else {
        return "Good Night";
      }
    };

    setGreeting(getGreeting());
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const attendancePercentage = employee ? ((employee.Present / (employee.Present + employee.Absent)) * 100).toFixed(2) : 0;
  const data = {
    labels: ["Present", "Absent"],
    datasets: [
      {
        data: [
          attendancePercentage,
          (100 - attendancePercentage).toFixed(2)
        ],
        backgroundColor: ["#36A2EB", "#FF6384"],
        hoverBackgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.label}: ${tooltipItem.raw}%`;
          },
        },
      },
    },
  };

  const status = "pending";
  const classNames = `p-3 px-[24px] mr-4 pr-14 ${
    status === "complete"
      ? "bg-green-300 text-green-800"
      : "bg-red-300 text-red-800"
  } font-bold rounded-xl`;

  return (
    <div className="overflow-y-auto">
      <EmployeeSidebar />
      <EmployeeTopbar />
      <div className="ml-[18%] pt-[60px] flex flex-col w-[100-18%] h-full p-4 bg-white mt-10">
        <div className="flex flex-col">
          <div className="flex">
            <p className="text-2xl border-l-4 rounded pl-2 h-fit border-[#7E3AF2]">
              {greeting},
            </p>
            <p className="ml-2 text-2xl">{employee.FirstName}</p>
          </div>
          <p className="ml-4 mt-[3px]">Let's see how you are doing...</p>
        </div>

        {/* Cards */}
        <div className="flex mt-4 gap-8 w-full">
          <div className="flex ml-[20px] shadow-md rounded-xl relative p-4 w-[60%] h-[240px] bg-[#f2f2f2] text-white">
            <div className="flex w-full h-full text-black">
              <img
                className="h-[180px] w-[180px] items-center justify-between mt-4 flex rounded-full"
                src={employee.ProfileImage}
                alt=""
              />
              <div className="flex flex-col text-slate-500">
                <p className="ml-4 mt-2 text-[22px] font-semibold tracking-widest">
                  {employee.FirstName} {employee.LastName}
                </p>
                <p className="ml-4 text-[16px] mt-[-5px]">{employee.Position}</p>
                <div className="flex gap-2 ml-4 mt-8 items-center">
                  <FaPhoneAlt /> <p>+91 {employee.PhoneNo}</p>
                </div>
                <div className="flex gap-2 ml-4 items-center">
                  <IoLocation /> <p>{employee.Address}</p>
                </div>
                <div className="flex gap-2 ml-4 items-center">
                  <GiShieldOpposition /> <p>{employee.Department}</p>
                </div>
                <div className="flex gap-2 ml-4 items-center">
                  <FaIdCard /> <p>{employee.EmployeeID}</p>
                </div>
              </div>
              <div className="flex p-2 bg-green-200 px-4 text-green-700 font-bold top-4 right-4 absolute h-fit w-fit rounded-xl">
                Active
              </div>
            </div>
          </div>
          <div className="flex shadow-md w-[40%] rounded-xl h-[240px] items-center justify-center bg-[#f2f2f2] text-white p-4">
            <Pie className="ml-6  " data={data} options={options} />
          </div>
        </div>

        <div className="flex h-[150px] w-full gap-4 mt-8 ml-4 ">
          <div className="flex hover:shadow-md p-2 bg-blue-300 rounded-xl w-[24%] h-full text-white">
            <div>
              <div className="m-4 h-[30px] w-[30px]  ">
                <SlGraph className="p-2 h-full w-full bg-black rounded-full  " />
              </div>
              <p className="ml-4 mt-[-10px]  ">Attendance</p>
              <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold ">
                {attendancePercentage}%
              </p>
            </div>
            <div className="flex justify-center ml-16 items-center">
              <SlGraph className="text-6xl  " />
            </div>
          </div>
          <div className="flex p-2 hover:shadow-md bg-pink-300 rounded-xl w-[23%] h-full text-white">
            <div>
              <div className="m-4 h-[30px] w-[30px] ">
                <FaTasks className="p-2 h-full w-full bg-black rounded-full  " />
              </div>
              <p className="ml-4 mt-[-10px]  ">Total Task</p>
              <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold ">
                {employee.Tasks_completed + employee.Due_tasks}
              </p>
            </div>
            <div className="flex  justify-center ml-16 items-center">
              <FaTasks className="text-6xl  " />
            </div>
          </div>
          <div className="flex p-2 hover:shadow-md bg-green-300 rounded-xl w-[23%] h-full text-white">
            <div>
              <div className="m-4 h-[30px] w-[30px] ">
                <MdOutlineIncompleteCircle className="p-2 h-full w-full bg-black rounded-full  " />
              </div>
              <p className="ml-4 mt-[-10px]  ">Complete Task</p>
              <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold ">
                {employee.Tasks_completed}
              </p>
            </div>
            <div className="flex justify-center ml-16 items-center">
              <MdOutlineIncompleteCircle className="text-6xl ml-[-15px] " />
            </div>
          </div>
          <div className="flex p-2 hover:shadow-md bg-orange-300 rounded-xl w-[24%] h-full text-white">
            <div>
              <div className="m-4 h-[30px] w-[30px] ">
                <GiProgression className="p-2 h-full w-full bg-black rounded-full  " />
              </div>
              <p className="ml-4 mt-[-10px]  ">Due Task</p>
              <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold ">
                {employee.Due_tasks}
              </p>
            </div>
            <div className="flex justify-center ml-16 items-center">
              <GiProgression className="text-6xl ml-[-15px] " />
            </div>
          </div>
        </div>

        {/* Pending Tasks */}
        <div className="flex flex-col mt-8">
          <div className="flex">
            <p className="text-2xl border-l-4 rounded pl-2 h-fit border-[#7E3AF2] mt-4 ml-4">
              Pending Tasks
            </p>
          </div>
          <div className="flex bg-[#f2f2f2] hover:shadow-md items-center justify-between h-[80px] rounded-xl  mt-4 mx-4">
            <p className="pl-5 font-semibold text-[#7E3AF2]">TaskID</p>
            <p className="font-semibold text-[#7E3AF2]">Title</p>
            <p className="font-semibold text-[#7E3AF2]">DueDate</p>
            <p className="font-semibold text-[#7E3AF2] pr-14">Status</p>
          </div>
          {pendingTasks.length > 0 ? (
            <div className="flex flex-col w-full top-0">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex bg-[#f2f2f2] hover:shadow-md items-center justify-between h-[80px] rounded-xl mt-4 mx-4">
                  <p className="pl-10">{task.taskID}</p>
                  <p>{task.title}</p>
                  <p>{task.dueDate}</p>
                  <p className={classNames}>{task.status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="ml-4 mt-2">No pending tasks found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
