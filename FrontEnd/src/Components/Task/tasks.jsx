import React, { useState } from 'react';
import EmployeeSidebar from '../Employee/EmployeeSidebar';
import EmployeeTopbar from '../Employee/EmployeeTopbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tasks = () => {
  const [dueDate, setDueDate] = useState('');
  const [assignTo, setAssignTo] = useState('');
  const [title, setTitle] = useState('');
  const [taskId, setTaskId] = useState('');
  const [description, setDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formDate = (dueDate) => {
    const [year, month, day] = dueDate.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleAssignToChange = (e) => {
    setAssignTo(e.target.value.trim());
  };

  const storedEmployee = localStorage.getItem('employee');
  const parsedEmployee = JSON.parse(storedEmployee);

  const createTask = async () => {
    try {
      const formattedDueDate = dueDate ? formDate(dueDate) : null;
      const payload = {
        taskID: taskId,
        title: title,
        description: description,
        assignedTo: assignTo, // Ensure this is in the correct format
        dueDate: formattedDueDate
      };

      console.log('Sending payload:', payload); // Log payload

      const response = await axios.post(`http://localhost:8000/api/v1/task/createtask/${parsedEmployee.EmployeeID}`, payload);
      toast.success('Task Created Successfully');
      console.log("Task Created Successfully", response);

      // Reset form data
      setTitle('');
      setTaskId('');
      setDescription('');
      setAssignTo('');
      setDueDate('');
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error While Creating Task:", error);
      toast.error('Failed to Create Task');
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='overflow-hidden'>
        <EmployeeSidebar />
        <EmployeeTopbar />
        <div className='ml-[6%] mt-8 border-0 z-2'>
          <h1 className='text-4xl border-l-[#1B67D9] border-l-4 rounded pl-4 text-slate-700 mb-5'>Task Management</h1>
          <button 
            onClick={() => setIsModalOpen(true)}
            className='bg-[#1B67D9] text-white hover:shadow-lg px-8 py-2 rounded-md hover:bg-[#1B6767]'
          >
            Open Task Form
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white p-6 rounded-md shadow-md w-[100%] max-w-2xl relative'>
                <h1 className='text-4xl text-center text-slate-700 mb-3'>Create Task</h1>

                <div className="grid grid-cols-2 gap-4">
                  <div className='flex flex-col'>
                    <label htmlFor='ID' className='text-lg font-semibold text-slate-700 mb-2'>Task ID:</label>
                    <input 
                      type='text' 
                      name='ID' 
                      id='ID' 
                      value={taskId}
                      onChange={(e) => setTaskId(e.target.value)}
                      className='border-2 border-black w-full bg-slate-50 p-2 rounded' 
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor='title' className='text-lg font-semibold text-slate-700 mb-2'>Title:</label>
                    <input 
                      type='text' 
                      name='title' 
                      id='title' 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className='border-2 border-black w-full bg-slate-50 p-2 rounded' 
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor='description' className='text-lg font-semibold text-slate-700 mb-2'>Description:</label>
                    <textarea 
                      name='description' 
                      id='description' 
                      rows='4' 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)} 
                      className='border-2 border-black w-full bg-slate-50 p-2 rounded'
                    ></textarea>
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor='assignTo' className='text-lg font-semibold text-slate-700 mb-2'>Assign To:</label>
                    <input 
                      type='text' 
                      name='assignTo' 
                      id='assignTo' 
                      value={assignTo}
                      onChange={handleAssignToChange}
                      className='border-2 border-black w-full bg-slate-50 p-2 rounded' 
                    />
                  </div>

                  <div className='flex flex-col'>
                    <label htmlFor='dueDate' className='text-lg font-semibold text-slate-700 mb-2'>Due Date:</label>
                    <input 
                      type='date' 
                      name='dueDate' 
                      id='dueDate' 
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className='border-2 border-black w-full bg-slate-50 p-2 rounded' 
                    />
                  </div>

                  <div className='col-span-2'>
                    <button 
                      type='button' 
                      onClick={createTask} 
                      className='bg-[#7E3AF2] text-white px-4 py-2 rounded-md hover:bg-[#6C2DBE] w-full'
                    >
                      Create Task
                    </button>
                  </div>
                </div>

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className='absolute top-2 right-2 text-xl text-gray-500 hover:text-gray-700'
                >
                  &times;
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Tasks;
