import React, { useState } from 'react';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeTopbar from './EmployeeTopbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { GiProgression } from "react-icons/gi";

const TaskManagement = () => {
  const navigate = useNavigate();

  // Sample data for tasks 
  const [tasks, setTasks] = useState([
    { id: 1, title: "Demo Task 1", status: "Pending" },
    { id: 2, title: "Demo Task 2", status: "Pending" },
    { id: 3, title: "Demo Task 3", status: "Pending" },
    { id: 4, title: "Demo Task 4", status: "Pending" },
    { id: 5, title: "Demo Task 5", status: "Pending" },
    { id: 6, title: "Demo Task 6", status: "Pending" },
    { id: 7, title: "Demo Task 7", status: "Pending" },
    { id: 8, title: "Demo Task 8", status: "Pending" },
    { id: 9, title: "Demo Task 9", status: "Pending" },
    { id: 10, title: "Demo Task 10", status: "Pending" },
    { id: 11, title: "Demo Task 11", status: "Pending" },
    { id: 12, title: "Demo Task 12", status: "Pending" },
    { id: 13, title: "Demo Task 13", status: "Pending" },
    { id: 14, title: "Demo Task 14", status: "Pending" },
    { id: 15, title: "Demo Task 15", status: "Pending" },
    { id: 16, title: "Demo Task 16", status: "Pending" },
    { id: 17, title: "Demo Task 17", status: "Pending" },
    { id: 18, title: "Demo Task 18", status: "Pending" },
  ]);

  // Count of completed tasks
  const completedTasksCount = tasks.filter(task => task.status === "Completed").length;

  // Function to mark a task as completed and remove it from the list
  const completeTask = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        return { ...task, status: "Completed" };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  // Function to delete a task
  const deleteTask = (taskId) => {
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    setTasks(updatedTasks);
  };

  return (
    <>
      <div className='overflow-hidden'>
        <EmployeeSidebar />
        <EmployeeTopbar />

        <div className='ml-[18%] mt-14 border-8 z-2'>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-4xl border-l-[#7E3AF2] border-l-4 rounded pl-4 text-slate-700'>Task Management</h1>
            <button onClick={() => navigate('/tasks')} className='mt-20 mr-4 bg-[#7E3AF2] text-white px-4 py-2 rounded-md hover:bg-[#6C2DBE] flex items-center'>
              <FontAwesomeIcon icon={faPlus} className='mr-2' />
              Create Task
            </button>
          </div>
          
          {/* Task Statistics Section */}
          <div className='flex flex-wrap justify-center gap-10 mt-8'>
            {/* Total Tasks */}
            <div className="flex p-2 hover:shadow-md bg-pink-300 rounded-xl w-[23%] h-full text-white">
              <div>
                <div className="m-4 h-[30px] w-[30px] bg-black rounded-full flex items-center justify-center">
                  <FaTasks className="text-white" />
                </div>
                <div className="ml-4">
                  <p className="mt-[-10px]">Total Tasks</p>
                  <p className="mb-2 text-4xl text-slate-800 font-bold">
                    {tasks.length}
                  </p>
                </div>
              </div>
            </div>
            
            {/* Complete Tasks */}
            <div className="flex p-2 hover:shadow-md bg-green-300 rounded-xl w-[23%] h-full text-white">
              <div>
                <div className="m-4 h-[30px] w-[30px] ">
                  <MdOutlineIncompleteCircle className="p-2 h-full w-full bg-black rounded-full" />
                </div>
                <p className="ml-4 mt-[-10px]  ">Complete Task</p>
                <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold text-green-600">
                  {completedTasksCount}
                </p>
              </div>
              <div className="flex justify-center ml-16 items-center">
                <MdOutlineIncompleteCircle className="text-6xl ml-[-15px] text-green-600" />
              </div>
            </div>
            
            {/* Due Tasks */}
            <div className="flex p-2 hover:shadow-md bg-orange-300 rounded-xl w-[24%] h-full text-white">
              <div>
                <div className="m-4 h-[30px] w-[30px] ">
                  <GiProgression className="p-2 h-full w-full bg-black rounded-full" />
                </div>
                <p className="ml-4 mt-[-10px]  ">Due Task</p>
                <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold">
                  {tasks.filter(task => task.status === "Pending").length}
                </p>
              </div>
              <div className="flex justify-center ml-16 items-center">
                <GiProgression className="text-6xl ml-[-15px] " />
              </div>
            </div>
          </div>

          {/* All Pending Tasks */}
          <h1 className='mt-10 text-2xl border-l-[#7E3AF2] border-l-4 rounded pl-4 text-slate-700 py-2'>Pending Tasks</h1>
          <div className='flex justify-between mt-8'>
            <div className='border-2 border-gray-300 w-[100%] overflow-y-auto max-h-[400px]'>
              <div className='flex justify-center gap-8 p-2 bg-gray-100'>
                <h2 className='w-1/4 text-center font-bold text-gray-800'>Task ID</h2>
                <h2 className='w-2/4 text-center font-bold text-gray-800'>Title</h2>
                <h2 className='w-1/4 text-center font-bold text-gray-800'>Status</h2>
                <h2 className='w-1/4 text-center font-bold text-gray-800'>Actions</h2>
              </div>
              {tasks.map(task => (
                <div key={task.id} className={`flex justify-center gap-8 p-2 ${task.status === "Completed" ? "hidden" : "block"}`}>
                  <p className='w-1/4 text-center'>{task.id}</p>
                  <p className='w-2/4 text-center'>{task.title}</p>
                  <p className={`w-1/4 text-center font-bold ${task.status === "Completed" ? "text-green-600" : "text-red-600"}`}>{task.status}</p>
                  {task.status === "Pending" && (
                    <div className='w-1/4 text-center'>
                      <button onClick={() => completeTask(task.id)} className='bg-green-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-green-600'>
                        Complete
                      </button>
                      <button onClick={() => deleteTask(task.id)} className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'>
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default TaskManagement;
