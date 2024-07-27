import React, { useState, useEffect } from 'react';
import EmployeeSidebar from '../Employee/EmployeeSidebar';
import EmployeeTopbar from '../Employee/EmployeeTopbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Rating from '@mui/material/Rating';
import axios from 'axios';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [toggle, setToggle] = useState({});
  const [techRating, setTechRating] = useState(0);
  const [commRating, setCommRating] = useState(0);
  const [leadRating, setLeadRating] = useState(0);
  const [selectedTask, setSelectedTask] = useState(null); // State to hold selected task details

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/task/getPendingTask');
        console.log(response.data);
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  const completeTask = (taskID) => {
    const updatedTasks = tasks.map(task => {
      if (task.taskID === taskID) {
        return { ...task, status: "Completed" };
      }
      return task;
    });
    setTasks(updatedTasks);
  };

  const deleteTask = (taskID) => {
    const updatedTasks = tasks.filter(task => task.taskID !== taskID);
    setTasks(updatedTasks);
  };

  const handleToggle = (taskID) => {
    setToggle((prevToggle) => ({
      ...prevToggle,
      [taskID]: !prevToggle[taskID],
    }));
    
    // Set the selected task when toggling
    const task = tasks.find(t => t.taskID === taskID);
    setSelectedTask(task);
  };

  const handleSubmit = async () => {
    if (!selectedTask) {
      console.error("No task selected");
      return;
    }

    const completionDate = getCurrentDate();
    const { taskID, title, description, dueDate, assignedTo } = selectedTask;

    const taskData = {
      taskID,
      title,
      description,
      dueDate,
      assignedTo,
      PerformanceScore: leadRating,
      TechnicalSkillsScore: techRating,
      SoftSkillsScore: commRating,
      completionDate
    };

    try {
      const response = await axios.post('http://localhost:8000/api/v1/task/completetask/', taskData);
      console.log('Task submitted successfully:', response.data);
      // Update task status to completed in local state
      completeTask(taskID);
    } catch (error) { 
      console.error('Error submitting task:', error);
    }
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayDate = `${day}-${month}-${year}`;
    return todayDate;
  }

  return (
    <>
      <div className='overflow-hidden'>
        <EmployeeSidebar />
        <EmployeeTopbar />

        <div className='ml-[5%] flex flex-col w-[100-18%] p-4 bg-white'>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-4xl border-l-[#1B67D9] border-l-4 rounded h-fit pl-4 text-slate-700'>Task Management</h1>
            <button onClick={() => navigate('/createtask')} className='mt-7 mr-2 bg-[#1B67D9] text-white px-4 py-2 rounded-md hover:bg-opacity-80 flex items-center'>
              <FontAwesomeIcon icon={faPlus} className='mr-2' />
              Create Task
            </button>
          </div>
          
          <div className='flex flex-wrap justify-center gap-9 mt-1'>
            {/* Add your statistics cards here */}
          </div>

          <div className='flex justify-between mt-8'>
            <div className='rounded border-t-8 border-spacing-6 w-full overflow-y-auto max-h-[400px]'>
              <div className='flex justify-center gap-4 p-3 bg-gray-200'>
                <h2 className='w-1/4 text-center font-bold text-slate-800'>Task ID</h2>
                <h2 className='w-1/2 text-center font-bold text-slate-800'>Title</h2>
                <h2 className='w-1/2 text-center font-bold text-slate-800'>Status</h2>
                <h2 className='w-1/2 text-center font-bold text-slate-800'>Actions</h2>
              </div>
              {tasks.map(task => (
                <div key={task.taskID} className={`flex border-2 shadow-sm justify-center gap-3 p-2 ${task.status === "Completed" ? "hidden" : "block"}`}>
                  <p className='w-1/4 text-center'>{task.taskID}</p>
                  <p className='w-1/2 text-center'>{task.title}</p>
                  <p className={`w-1/2 ml-[10%] text-left font-bold ${task.status === "Completed" ? "text-green-600" : "text-red-600"}`}>{task.status}</p>

                  <div className='w-1/3 text-center'>
                    <button 
                      className="flex p-2 bg-green-700 rounded text-white" 
                      onClick={() => handleToggle(task.taskID)}
                    >
                      Complete
                    </button>

                    {toggle[task.taskID] && selectedTask && (
                      <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="bg-white p-8 h-fit w-[80%] rounded-lg shadow-lg relative text-black overflow-y-auto">
                          <button 
                            className="mt-4 p-2 bg-red-800 rounded-lg border flex right-4 top-4 absolute text-white" 
                            onClick={() => handleToggle(task.taskID)}>
                            <IoMdClose />
                          </button>

                          <h1 className='text-2xl border-b-2 w-[15%] pb-2 ' >Task Reviews</h1>
                          <div className='flex flex-col h-full w-full'>
                              <div className="flex text-xl mt-4">
                                  <h1 className='w-[50%] text-left' >Task ID : {selectedTask.taskID} </h1>
                                  <h1>Title : {selectedTask.title}</h1>
                              </div>
                              <div className="flex text-xl mt-2 ">
                                  <h1 className='w-[50%] flex' >Description :  <span className="ml-2 w-[70%] " >{selectedTask.description}</span> </h1>
                                  <h1>Assigned Employee : {selectedTask.assignedTo} </h1>
                              </div>
                              
                              <div className="flex w-full mt-8 justify-between" >
                                <div className="flex items-center">
                                  <p>Technical Rating: </p>
                                  <Rating 
                                    name="tech-rating" 
                                    value={techRating} 
                                    precision={0.5} 
                                    onChange={(event, newValue) => {
                                      setTechRating(newValue);
                                    }} 
                                  />
                                </div>
                                <div className="flex items-center">
                                  <p>Soft-skill : </p>
                                  <Rating 
                                    name="comm-rating" 
                                    value={commRating} 
                                    precision={0.5} 
                                    onChange={(event, newValue) => {
                                      setCommRating(newValue);
                                    }} 
                                  />
                                </div>
                                <div className="flex items-center">
                                  <p>Performance score : </p>
                                  <Rating 
                                    name="lead-rating" 
                                    value={leadRating} 
                                    precision={0.5} 
                                    onChange={(event, newValue) => {
                                      setLeadRating(newValue);
                                    }} 
                                  />
                                </div>
                              </div>

                              <button className="p-2 bg-blue-700 w-fit rounded-md h-fit text-white mt-6" onClick={handleSubmit}>Submit</button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
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
