// import React, { useState } from 'react';

// function TaskForm({ onSubmit, newTask, setNewTask }) {
//   const [inputValue, setInputValue] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit(e);
//   };

//   const handleChange = (e) => {
//     setInputValue(e.target.value);
//     setNewTask(e.target.value);
//   };

//   return (
//     <div className=' mt-30px w-full overflow-y-auto'>
//       <form onSubmit={handleSubmit}>
//         <input type="text" className='border-zinc-900 border-2 rounded mt-7 mb-7' value={inputValue} onChange={handleChange} />
//         <button type="submit" className='bg-cyan-300 p-2 border-2 rounded ml-[30px] border-zinc-900'>Add Task</button>
//       </form>
//     </div>
//   );
// }

// export default TaskForm;

import React, { useState } from 'react';

const TaskForm = ({ isOpen, onClose }) => {
  const [subtasks, setSubtasks] = useState(['']);
  const [formData, setFormData] = useState({
    taskId: '',
    employeeName: '',
    employeeId: '',
    description: '',
    dueDate: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubtaskChange = (index, value) => {
    const newSubtasks = [...subtasks];
    newSubtasks[index] = value;
    setSubtasks(newSubtasks);
  };

  const addSubtask = () => {
    setSubtasks([...subtasks, '']);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form Data:', formData);
    console.log('Subtasks:', subtasks);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Task ID</label>
            <input
              type="text"
              name="taskId"
              value={formData.taskId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Employee Name</label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Employee ID</label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Subtasks</label>
            {subtasks.map((subtask, index) => (
              <input
                key={index}
                type="text"
                value={subtask}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
                className="w-full p-2 mb-2 border rounded"
              />
            ))}
            <button
              type="button"
              onClick={addSubtask}
              className="w-full p-2 bg-blue-500 text-white rounded"
            >
              Add Subtask
            </button>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="p-2 bg-gray-300 rounded mr-2"
            >
              Cancel
            </button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
