import React, { useState } from 'react';
import EmployeeTopbar from '../Employee/EmployeeTopbar';
import Sidebar from '../Employee/EmployeeSidebar';

const EmployeeList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const users = [
    { name: 'Gino Deedrick', score: "95.343%", id: '6', rank: 1, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Shane Abellana', score: "93.871%", id: '13', rank: 2, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { name: 'Robert Pawelec', score: "89.456%", id: '9', rank: 3, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 4, name: 'Xiomara Domka', id: '3', score: "83.543%", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D" },
    { rank: 5, name: 'Caroline Tillo', id: '8', score: "79.643%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 6, name: 'Myron Battistini', id: '5', score: "77.643%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 7, name: 'Xiomara Domka', id: '17', score: "73.654%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 8, name: 'Caroline Tillo', id: '15', score: "71.346%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 9, name: 'Myron Battistini', id: '1', score: "69.366%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 10, name: 'Xiomara Domka', id: '14', score: "63.734%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 11, name: 'Caroline Tillo', id: '7', score: "60.634%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 12, name: 'Myron Battistini', id: '2', score: "59.657%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 13, name: 'Xiomara Domka', id: '10', score: "57.365%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 14, name: 'Caroline Tillo', id: '11', score: "57.659%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 15, name: 'Myron Battistini', id: '16', score: "56.367%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 16, name: 'Xiomara Domka', id: '18', score: "54.966%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 17, name: 'Caroline Tillo', id: '4', score: "52.437%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
    { rank: 18, name: 'Myron Battistini', id: '12', score: "49.577%", image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D' },
  ];

  
  const filteredUsers = users.filter(user =>
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    
    <div className='overflow-y-auto'>
        <Sidebar/>
        <EmployeeTopbar/>
        <div className="p-6 ml-[6%] bg-white min-h-screen relative ">
        <div className="flex items-center justify-between pt-[1%] pb-[1%] border-gray-300">
            <h1 className="text-4xl border-l-[#1B67D9] border-l-4 rounded h-fit pl-4 text-slate-700">Employee List</h1>
        </div>
      <input
        type="text"
        placeholder="Search by ID"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="p-2 border-2 mb-4 rounded-md right-6 absolute "
      />


      <div className="flex h-full w-full border-2 rounded-md mt-[80px]">
        <div className="h-full w-full">
          <div className="text-slate-800 rounded-lg">
            <div className="grid grid-cols-6 text-center p-4 border-b border font-bold ">
              <div>RANK</div>
              <div>NAME</div>
              <div>ID</div>
              <div> </div>
              <div> </div>
              <div className="ml-2">SCORE</div>
            </div>
            {filteredUsers.map(user => (
              <div key={user.rank} className="grid bg-gray-100 hover:bg-gray-200 odd:bg-white grid-cols-6 text-center p-2 border-b border">
                <div className="flex items-center justify-center gap-2">
                  <img src={user.image} alt={user.name} className="w-8 h-8 rounded-full" />
                  {user.rank}
                </div>
                <div>{user.name}</div>
                <div>{user.id}</div>
                <div>{user.totalTime}</div>
                <div>{user.challenges}</div>
                <div>{user.score}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default EmployeeList;