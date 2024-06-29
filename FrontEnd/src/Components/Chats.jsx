import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from './Employee/EmployeeSidebar';
import EmployeeTopbar from './Employee/EmployeeTopbar';
import { FaPaperPlane } from 'react-icons/fa';
import axios from 'axios';

const Chats = () => {
  const { employeeID } = useParams();
  const [chats, setChats] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  // to get current time
  const getCurrentTime = () => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
  
    const formattedTime = `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${ampm}`;
    return formattedTime;
  };
  // Fetch chats for the specified employee
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/chats/`);
        setChats(response.data);
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [employeeID][Chats]);

  // Function to handle sending a message
  const sendMessage = async () => {
    try {
      const newMessage = {
        employeeID: employeeID,
        message: messageInput,
        date: new Date().toISOString(), 
        ProfileImage: "ProfileImage", 
        FirstName: "FirstName", 
        LastName:"LastName",
        Time : getCurrentTime()
      };

      // Example of sending message to backend
      console.log(newMessage)
      const response = await axios.post(`http://localhost:8000/api/v1/chats/${employeeID}`, newMessage);
      console.log('Message sent:', response.data);

      // Update local state to reflect the new message
      setChats([...chats, newMessage]);
      setMessageInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <SideBar />
      <EmployeeTopbar bgColor="bg-gray-100" />
      {/* Chat Area */}
      <div className="ml-[18%] flex flex-col w-full h-full p-4">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300">
          <h2 className="text-xl font-bold text-black">Chats</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col space-y-4">
            {chats.map((chat, index) => (
              <div key={index} className={`flex ${chat.EmployeeID === employeeID ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-xs rounded-lg p-4 ${chat.EmployeeID === employeeID ? 'bg-gray-200 text-black self-end' : 'bg-blue-500 self-start text-white'}`}>
                  <p>{chat.message}</p>
                  <span className="text-sm text-gray-500">{chat.Time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-300 flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            className="w-full p-2 border rounded-lg"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button className="ml-2 p-2 bg-blue-500 text-white rounded-full" onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chats;
