// import React, { useState } from 'react';
// import EmployeeSidebar from '../Employee/EmployeeSidebar';
// import EmployeeTopbar from '../Employee/EmployeeTopbar';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPlus } from '@fortawesome/free-solid-svg-icons';
// import { useNavigate } from 'react-router-dom';
// import { FaTasks } from "react-icons/fa";
// import { MdOutlineIncompleteCircle } from "react-icons/md";
// import { GiProgression } from "react-icons/gi";
// import Rating from '@mui/material/Rating'
// const TaskManagement = () => {
//   const navigate = useNavigate();

//   // Sample data for tasks 
//   const [tasks, setTasks] = useState([
//     { id: 1, title: "Demo Task 1", status: "Pending" },
//     { id: 2, title: "Demo Task 2", status: "Pending" },
//     { id: 3, title: "Demo Task 3", status: "Pending" },
//     { id: 4, title: "Demo Task 4", status: "Pending" },
//     { id: 5, title: "Demo Task 5", status: "Pending" },
//     { id: 6, title: "Demo Task 6", status: "Pending" },
//     { id: 7, title: "Demo Task 7", status: "Pending" },
//     { id: 8, title: "Demo Task 8", status: "Pending" },
//     { id: 9, title: "Demo Task 9", status: "Pending" },
//     { id: 10, title: "Demo Task 10", status: "Pending" },
//     { id: 11, title: "Demo Task 11", status: "Pending" },
//     { id: 12, title: "Demo Task 12", status: "Pending" },
//     { id: 13, title: "Demo Task 13", status: "Pending" },
//     { id: 14, title: "Demo Task 14", status: "Pending" },
//     { id: 15, title: "Demo Task 15", status: "Pending" },
//     { id: 16, title: "Demo Task 16", status: "Pending" },
//     { id: 17, title: "Demo Task 17", status: "Pending" },
//     { id: 18, title: "Demo Task 18", status: "Pending" },
//   ]);

//   // Count of completed tasks
//   const completedTasksCount = tasks.filter(task => task.status === "Completed").length;

//   // Function to mark a task as completed and remove it from the list
//   const completeTask = (taskId) => {
//     const updatedTasks = tasks.map(task => {
//       if (task.id === taskId) {
//         return { ...task, status: "Completed" };
//       }
//       return task;
//     });
//     setTasks(updatedTasks);
//   };

//   // Function to delete a task
//   const deleteTask = (taskId) => {
//     const updatedTasks = tasks.filter(task => task.id !== taskId);
//     setTasks(updatedTasks);
//   };

//   const [toggle, setToggle] = useState(false);
//   const [techRating, setTechRating] = useState(0);
//   const [commRating, setCommRating] = useState(0);
//   const [leadRating, setLeadRating] = useState(0);


//   console.log(techRating, commRating, leadRating)


//   const handleToggle = () => {
//     setToggle(!toggle);
//   };

//   return (
//     <>
//       <div className='overflow-hidden'>
//         <EmployeeSidebar />
//         <EmployeeTopbar />

//         <div className='ml-[5%] flex flex-col w-[100-18%] p-4 bg-white'>
//           <div className='flex justify-between items-center mb-5'>
//             <h1 className='text-4xl border-l-[#1B67D9] border-l-4 rounded h-fit pl-4 text-slate-700'>Task Management</h1>
//             <button onClick={() => navigate('/tasks')} className='mt-7 mr-2 bg-[#1B67D9] text-white px-4 py-2 rounded-md hover:bg-[#2dbe3c] flex items-center'>
//               <FontAwesomeIcon icon={faPlus} className='mr-2' />
//               Create Task
//             </button>
//           </div>
          
//           {/* Task Statistics Section */}
//           <div className='flex flex-wrap justify-center gap-9 mt-1'>
//             {/* Total Tasks */}
//             <div className="flex p-2 hover:shadow-md bg-pink-300 rounded-xl w-[24%] h-full text-white">
//               <div>
//                 <div className="m-4 h-[30px] w-[30px] bg-black rounded-full flex items-center justify-center">
//                   <FaTasks className="text-white" />
//                 </div>
//                 <div className="ml-4">
//                   <p className="mt-[-10px]">Total Tasks</p>
//                   <p className="mb-2 text-4xl text-slate-800 font-bold">
//                     {tasks.length}
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             {/* Complete Tasks */}
//             <div className="flex p-2 hover:shadow-md bg-green-300 rounded-xl w-[24%] h-full text-white">
//               <div>
//                 <div className="m-4 h-[30px] w-[30px] ">
//                   <MdOutlineIncompleteCircle className="p-2 h-full w-full bg-black rounded-full" />
//                 </div>
//                 <p className="ml-4 mt-[-10px]  ">Complete Task</p>
//                 <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold">
//                   {completedTasksCount}
//                 </p>
//               </div>
//               <div className="flex justify-center ml-16 items-center">
//                 <MdOutlineIncompleteCircle className="text-6xl ml-[-15px] text-green-600" />
//               </div>
//             </div>
            
//             {/* Due Tasks */}
//             <div className="flex p-2 hover:shadow-md bg-orange-300 rounded-xl w-[24%] h-full text-white">
//               <div>
//                 <div className="m-4 h-[30px] w-[30px] ">
//                   <GiProgression className="p-2 h-full w-full bg-black rounded-full" />
//                 </div>
//                 <p className="ml-4 mt-[-10px]  ">Due Task</p>
//                 <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold">
//                   {tasks.filter(task => task.status === "Pending").length}
//                 </p>
//               </div>
//               <div className="flex justify-center ml-16 items-center">
//                 <GiProgression className="text-6xl ml-[-15px] " />
//               </div>
//             </div>
//           </div>

//           {/* All Pending Tasks */}
//           <h1 className='mt-10 text-2xl border-l-[#1B67D9] border-l-4 rounded pl-4 text-slate-700 py-2'>Pending Tasks</h1>
//           <div className='flex justify-between mt-8'>
//             <div className='rounded shadow-lg border-t-8 border-spacing-6 border-slate-800 w-full overflow-y-auto max-h-[400px]'>
//               <div className='flex justify-center gap-4 p-3 bg-gray-200'>
//                 <h2 className='w-1/4 text-center font-bold text-slate-800'>Task ID</h2>
//                 <h2 className='w-1/2 text-center font-bold text-slate-800'>Title</h2>
//                 <h2 className='w-1/2 text-center font-bold text-slate-800'>Status</h2>
//                 <h2 className='w-1/2 text-center font-bold text-slate-800'>Actions</h2>
//               </div>
//               {tasks.map(task => (
//                 <div key={task.id} className={`flex border-2 shadow-sm justify-center gap-3 p-2 ${task.status === "Completed" ? "hidden" : "block"}`}>
//                   <p className='w-1/4 text-center'>{task.id}</p>
//                   <p className='w-1/2 text-center'>{task.title}</p>
//                   <p className={`w-1/2 ml-[10%] text-left font-bold ${task.status === "Completed" ? "text-green-600" : "text-red-600"}`}>{task.status}</p>

//                   {task.status === "Pending" && (
//                     <div className='w-1/3 text-center'>
//                       <div className="">
//                         <button 
//                           className="flex p-2 bg-green-700 rounded text-white" 
//                           onClick={handleToggle}
//                         >
//                           Complete
//                         </button>

//                         {toggle && (
//                           <div className=" inset-0 w-full h-full  flex items-center justify-center relative">
//                             <div className="bg-white p-8 h-full w-[80%] rounded shadow-lg relative text-black">
//                               <button 
//                                 className="mt-4 p-2 bg-red-800 rounded-lg border flex right-4 top-4 absolute text-white" 
//                                 onClick={handleToggle}>
//                                 <IoMdClose />
//                               </button>

//                               <h1 className='text-2xl border-b-2 w-[15%] pb-2 ' >Task Reviews</h1>
//                               <div className='flex flex-col h-full w-full'>
//                                   <div className="flex text-xl mt-4">
//                                       <h1 className='w-[50%]' >Task ID : 295 </h1>
//                                       <h1>Title : Karan</h1>
//                                   </div>
//                                   <div className="flex text-xl mt-2 ">
//                                       <h1 className='w-[50%] flex' >Description :  <span className="ml-2 w-[70%] " >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus qui odit culpa officiis nam labore illum eligendi beatae ex aliquam.</span> </h1>
//                                       <h1>Assigned Employee : Jone doe </h1>
//                                   </div>
                                  
//                                   <div className="flex w-full mt-8 justify-between" >
//                                     <div className="flex items-center">
//                                       <p>Technical Rating: </p>
//                                       <Rating 
//                                         name="tech-rating" 
//                                         value={techRating} 
//                                         precision={0.5} 
//                                         onChange={(event, newValue) => {
//                                           setTechRating(newValue);
//                                         }} 
//                                       />
//                                     </div>
//                                     <div className="flex items-center">
//                                       <p>Soft-skill : </p>
//                                       <Rating 
//                                         name="comm-rating" 
//                                         value={commRating} 
//                                         precision={0.5} 
//                                         onChange={(event, newValue) => {
//                                           setCommRating(newValue);
//                                         }} 
//                                       />
//                                     </div>
//                                     <div className="flex items-center">
//                                       <p>Performance score : </p>
//                                       <Rating 
//                                         name="lead-rating" 
//                                         value={leadRating} 
//                                         precision={0.5} 
//                                         onChange={(event, newValue) => {
//                                           setLeadRating(newValue);
//                                         }} 
//                                       />
//                                     </div>
//                                   </div>

//                                   <button className="p-2 bg-blue-700 w-fit rounded-md h-fit text-white mt-6">submit</button>
//                               </div>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// };

// export default TaskManagement;











import React, { useState } from 'react';
import EmployeeSidebar from '../Employee/EmployeeSidebar';
import EmployeeTopbar from '../Employee/EmployeeTopbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { FaTasks } from "react-icons/fa";
import { MdOutlineIncompleteCircle } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import Rating from '@mui/material//Rating';

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

  const [toggle, setToggle] = useState({});
  const [techRating, setTechRating] = useState(0);
  const [commRating, setCommRating] = useState(0);
  const [leadRating, setLeadRating] = useState(0);

  const handleToggle = (taskId) => {
    setToggle((prevToggle) => ({
      ...prevToggle,
      [taskId]: !prevToggle[taskId],
    }));
  };

  return (
    <>
      <div className='overflow-hidden'>
        <EmployeeSidebar />
        <EmployeeTopbar />

        <div className='ml-[5%] flex flex-col w-[100-18%] p-4 bg-white'>
          <div className='flex justify-between items-center mb-5'>
            <h1 className='text-4xl border-l-[#1B67D9] border-l-4 rounded h-fit pl-4 text-slate-700'>Task Management</h1>
            <button onClick={() => navigate('/tasks')} className='mt-7 mr-2 bg-[#1B67D9] text-white px-4 py-2 rounded-md hover:bg-[#2dbe3c] flex items-center'>
              <FontAwesomeIcon icon={faPlus} className='mr-2' />
              Create Task
            </button>
          </div>
          
          {/* Task Statistics Section */}
          <div className='flex flex-wrap justify-center gap-9 mt-1'>
            {/* Total Tasks */}
            <div className="flex p-2 hover:shadow-md bg-pink-300 rounded-xl w-[24%] h-full text-white">
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
            <div className="flex p-2 hover:shadow-md bg-green-300 rounded-xl w-[24%] h-full text-white">
              <div>
                <div className="m-4 h-[30px] w-[30px] ">
                  <MdOutlineIncompleteCircle className="p-2 h-full w-full bg-black rounded-full" />
                </div>
                <p className="ml-4 mt-[-10px]  ">Complete Task</p>
                <p className="ml-4 mb-2 text-4xl text-slate-800 font-bold">
                  {tasks.filter(task => task.status === "Completed").length}
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
          <h1 className='mt-10 text-2xl border-l-[#1B67D9] border-l-4 rounded pl-4 text-slate-700 py-2'>Pending Tasks</h1>
          <div className='flex justify-between mt-8'>
            <div className='rounded shadow-lg border-t-8 border-spacing-6 border-slate-800 w-full overflow-y-auto max-h-[400px]'>
              <div className='flex justify-center gap-4 p-3 bg-gray-200'>
                <h2 className='w-1/4 text-center font-bold text-slate-800'>Task ID</h2>
                <h2 className='w-1/2 text-center font-bold text-slate-800'>Title</h2>
                <h2 className='w-1/2 text-center font-bold text-slate-800'>Status</h2>
                <h2 className='w-1/2 text-center font-bold text-slate-800'>Actions</h2>
              </div>
              {tasks.map(task => (
                <div key={task.id} className={`flex border-2 shadow-sm justify-center gap-3 p-2 ${task.status === "Completed" ? "hidden" : "block"}`}>
                  <p className='w-1/4 text-center'>{task.id}</p>
                  <p className='w-1/2 text-center'>{task.title}</p>
                  <p className={`w-1/2 ml-[10%] text-left font-bold ${task.status === "Completed" ? "text-green-600" : "text-red-600"}`}>{task.status}</p>

                  {task.status === "Pending" && (
                    <div className='w-1/3 text-center'>
                      <div className="">
                        <button 
                          className="flex p-2 bg-green-700 rounded text-white" 
                          onClick={() => handleToggle(task.id)}
                        >
                          Complete
                        </button>

                        {toggle[task.id] && (
                          <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-8 h-fit w-[80%] rounded-lg shadow-lg relative text-black overflow-y-auto">
                              <button 
                                className="mt-4 p-2 bg-red-800 rounded-lg border flex right-4 top-4 absolute text-white" 
                                onClick={() => handleToggle(task.id)}>
                                <IoMdClose />
                              </button>

                              <h1 className='text-2xl border-b-2 w-[15%] pb-2 ' >Task Reviews</h1>
                              <div className='flex flex-col h-full w-full'>
                                  <div className="flex text-xl mt-4">
                                      <h1 className='w-[50%] text-left' >Task ID : {task.id} </h1>
                                      <h1>Title : {task.title}</h1>
                                  </div>
                                  <div className="flex text-xl mt-2 ">
                                      <h1 className='w-[50%] flex' >Description :  <span className="ml-2 w-[70%] " >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus qui odit culpa officiis nam labore illum eligendi beatae ex aliquam.</span> </h1>
                                      <h1>Assigned Employee : John Doe </h1>
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

                                  <button className="p-2 bg-blue-700 w-fit rounded-md h-fit text-white mt-6">submit</button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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
