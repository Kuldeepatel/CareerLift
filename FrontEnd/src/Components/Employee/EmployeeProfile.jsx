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
import Rating from './Rating';
import CountUp from "react-countup";

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
          console.log(response.data)
          const tasksResponse = await axios.get(`http://localhost:8000/api/v1/task/${parsedEmployee.EmployeeID}`);
          setPendingTasks(tasksResponse.data);
          console.log(tasksResponse.data)
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
        hoverBackgroundColor: ["#2e92d4", "#f75679"],
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
      <div className="ml-[55px] pt-[10px] flex flex-col w-[100-18%]  h-full p-4">

      <div className="flex flex-col h-fit">
        <div className="flex flex-col bg-white m-3 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Dashboard</h1>
            {/* <div className="text-lg">ROMIN</div> */}
          </div>
          <div className="flex items-center ml-10 mb-6">
            <div className="mr-2">
            <img
                className="h-[280px] w-[380px] items-center justify-between mt-1 flex rounded-full"
                // src={employee.ProfileImage}
                src="https://cdni.iconscout.com/illustration/premium/thumb/employee-performance-evaluation-5682463-4734461.png?f=webp"
                // src="https://www.shutterstock.com/image-vector/monitor-dashboard-male-character-giant-260nw-2037523238.jpg"
                // src="https://img.freepik.com/premium-vector/global-economic-concept-with-people-scene-flat-design-woman-analyzing-financial-data-creates-strategy-investing-business-startups-vector-illustration-with-character-situation-web_9209-10097.jpg?size=626&ext=jpg&ga=GA1.1.121323546.1721742267&semt=ais_user"
                alt=""
              />
            </div>
            <div className="ml-[150px]">
              <h2 className="text-6xl font-semibold mb-2 ">{greeting}, {employee.FirstName}</h2>
              <div className="flex gap-2 ml-4 items-center text-2xl text-gray-500">
                    <FaIdCard /> <p>{employee.Position}</p>
                  </div>
            </div>
          </div>
          <div className="flex justify-between w-full">
            {/* stat1 */}
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold"><CountUp start={0} end={9000} duration={4} /><span className="text-orange-500">+</span></span>
                <span className="text-gray-700">Premium Product</span>
            </div>
            {/* stat2 */}
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold"><CountUp start={0} end={2000} duration={4} /><span className="text-orange-500">+</span></span>
                <span className="text-gray-700">Happy Customers</span>
            </div>
            {/* stat3 */}
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold"><CountUp start={0} end={28} duration={4} /><span className="text-orange-500">+</span></span>
                <span className="text-gray-700">Awards Winning</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-4xl font-bold"><CountUp start={0} end={28} duration={4} /><span className="text-orange-500">+</span></span>
                <span className="text-gray-700">Awards Winning</span>
            </div>
        </div>
          
        </div>
      </div>
          

          <div className="flex h-[150px] w-full gap-4 mt-8 ml-4 ">
            <div className="flex hover:shadow-2xl p-2 bg-blue-300 border-2 border-gray-300 rounded-xl w-[23%] h-full text-white hover:opacity-100">
              <div>
                <div className="m-4 h-[30px] w-[30px]  ">
                  <SlGraph className="p-2 h-full w-full bg-black rounded-full  " />
                </div>
                <p className="ml-4 mt-[-10px]  text-white">Attendance</p>
                <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold ">
                  {attendancePercentage}%
                </p>
              </div>
              <div className="flex justify-center ml-16 items-center">
                <SlGraph className="text-6xl  " />
              </div>
            </div>
            <div className="flex p-2 hover:shadow-lg bg-pink-300 rounded-xl w-[23%] h-full text-white">
              <div>
                <div className="m-4 h-[30px] w-[30px] ">
                  <FaTasks className="p-2 h-full w-full bg-black rounded-full  " />
                </div>
                <p className="ml-4 mt-[-10px]  ">Total Task</p>
                <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold ">
                  {employee.ProjectsCompleted + employee.ProjectsDue}
                </p>
              </div>
              <div className="flex  justify-center ml-16 items-center">
                <FaTasks className="text-6xl  " />
              </div>
            </div>
            <div className="flex p-2 hover:shadow-lg bg-green-300 rounded-xl w-[23%] h-full text-white">
              <div>
                <div className="m-4 h-[30px] w-[30px] ">
                  <MdOutlineIncompleteCircle className="p-2 h-full w-full bg-black rounded-full  " />
                </div>
                <p className="ml-4 mt-[-10px]  ">Complete Task</p>
                <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold ">
                  {employee.ProjectsCompleted}
                </p>
              </div>
              <div className="flex justify-center ml-16 items-center">
                <MdOutlineIncompleteCircle className="text-6xl ml-[-15px] " />
              </div>
            </div>
            <div className="flex p-2 hover:shadow-lg bg-orange-300 rounded-xl w-[23%] h-full text-white">
              <div>
                <div className="m-4 h-[30px] w-[30px] ">
                  <GiProgression className="p-2 h-full w-full bg-black rounded-full  " />
                </div>
                <p className="ml-4 mt-[-10px]  ">Due Task</p>
                <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold ">
                  {employee.ProjectsDue}
                </p>
              </div>
              <div className="flex justify-center ml-16 items-center">
                <GiProgression className="text-6xl ml-[-15px] " />
              </div>
            </div>
          </div>

          <div className="flex">
            <p className="text-2xl border-l-4 rounded pl-2 h-fit border-[#1B67D9] mt-4 ml-0">
              Attendance
            </p>
          </div>
          <div className="flex w-[50%] rounded-xl h-[400px] items-center justify-center text-white p-4">
          
            <Pie data={data} options={options} />
          </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;



