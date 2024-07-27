import React, { useState } from 'react';
import EmployeeSidebar from './EmployeeSidebar';
import EmployeeTopbar from './EmployeeTopbar';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Tasks = () => {
  const [dueDate, setDueDate] = useState('');
  const [assignTo, setAssignTo] = useState([]);
  const [title, setTitle] = useState('');
  const [taskId, setTaskId] = useState('');
  const [description, setDescription] = useState('');

  const formDate = (dueDate) => {
    const [year, month, day] = dueDate.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleAssignToChange = (e) => {
    const value = e.target.value.trim();
    const ids = value.split(',').map(id => id.trim());
    setAssignTo(ids);
  };

  const storedEmployee = localStorage.getItem('employee');
  const parsedEmployee = JSON.parse(storedEmployee);

  const createTask = async () => {
    try {
      const formattedDueDate = dueDate ? formDate(dueDate) : null;
      const response = await axios.post(`http://localhost:8000/api/v1/task/createtask/${parsedEmployee.EmployeeID}`, {
        taskID: taskId,
        title: title,
        description: description,
        assignedTo: assignTo,
        dueDate: formattedDueDate
      });
      toast.success('Task Created Successfully');
      console.log("Task Created Successfully", response);

      setTitle('');
      setTaskId('');
      setDescription('');
      setAssignTo([]);
      setDueDate('');
    } catch (error) {
      toast.error('Failed to Create Task');
      console.error("Error While Creating Task:", error);
      
    }
  };

  return (
    <>
      <ToastContainer />
      <div className='overflow-hidden'>
        <EmployeeSidebar />
        <EmployeeTopbar />
        <div className='ml-[18%] mt-14 border-8 z-2'>
          <h1 className='text-4xl border-l-[#7E3AF2] border-l-4 rounded pl-4 text-slate-700 mb-5'>Task Management</h1>
          <div className='flex justify-center'>
            <div className='w-[40%] border-2 p-6 bg-white rounded-md shadow-md'>
              <h1 className='text-2xl text-center text-slate-700 mb-6'>Create Tasks</h1>

              <div className="space-y-4">
                <div className='flex flex-col'>
                  <label htmlFor='ID' className='block text-lg font-semibold text-slate-700 mb-2'>Task ID:</label>
                  <input type='text' name='ID' id='ID' value={taskId}
                    onChange={(e) => setTaskId(e.target.value)}
                    className='border-2 border-black w-full bg-slate-50 p-2 rounded' />
                </div>

                <div className='flex flex-col'>
                  <label htmlFor='title' className='block text-lg font-semibold text-slate-700 mb-2'>Title:</label>
                  <input type='text' name='title' id='title' value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='border-2 border-black w-full bg-slate-50 p-2 rounded' />
                </div>

                <div className='flex flex-col'>
                  <label htmlFor='description' className='block text-lg font-semibold text-slate-700 mb-2'>Description:</label>
                  <textarea name='description' id='description' rows='4' value={description}
                    onChange={(e) => setDescription(e.target.value)} className='border-2 border-black w-full bg-slate-50 p-2 rounded'></textarea>
                </div>

                <div className='flex flex-col'>
                  <label htmlFor='assignTo' className='block text-lg font-semibold text-slate-700 mb-2'>Assign To:</label>
                  <input type='text' name='assignTo' id='assignTo' value={assignTo.join(', ')}
                    onChange={handleAssignToChange}
                    className='border-2 border-black w-full bg-slate-50 p-2 rounded' />
                </div>

                <div className='flex flex-col'>
                  <label htmlFor='dueDate' className='block text-lg font-semibold text-slate-700 mb-2'>Due Date:</label>
                  <input type='date' name='dueDate' id='dueDate' value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className='border-2 border-black w-full bg-slate-50 p-2 rounded' />
                </div>

                <button type='button' onClick={createTask} className='bg-[#7E3AF2] text-white px-4 py-2 rounded-md hover:bg-[#6C2DBE]'>Create Task</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasks;
