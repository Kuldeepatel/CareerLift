import React, { useState } from 'react';

function TaskForm({ onSubmit, newTask, setNewTask }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setNewTask(e.target.value);
  };

  return (
    <div className=' mt-30px w-full overflow-y-auto'>
      <form onSubmit={handleSubmit}>
        <input type="text" className='border-zinc-900 border-2 rounded mt-7 mb-7' value={inputValue} onChange={handleChange} />
        <button type="submit" className='bg-cyan-300 p-2 border-2 rounded ml-[30px] border-zinc-900'>Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;