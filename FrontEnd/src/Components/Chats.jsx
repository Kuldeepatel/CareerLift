import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import SideBar from './Employee/EmployeeSidebar';
import EmployeeTopbar from './Employee/EmployeeTopbar';
import { FaPaperPlane } from 'react-icons/fa';
import { FiFile, FiX } from 'react-icons/fi';
import axios from 'axios';

const Chats = () => {
  const { employeeID } = useParams();
  const [chats, setChats] = useState([]);
  const [employeeData, setEmployeeData] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [file, setFile] = useState(null);
  const [modalImage, setModalImage] = useState(null); // State to manage modal image
  const chatContainerRef = useRef(null);

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
        scrollToBottom();
      } catch (error) {
        console.error('Error fetching chats:', error);
      }
    };

    fetchChats();
  }, [employeeID]);

  // Function to handle sending a message or image
  const sendMessage = async () => {
    try {
      let formData = new FormData();
      formData.append('employeeID', employeeID);
      formData.append('date', new Date().toISOString());
      formData.append('ProfileImage', employeeData.ProfileImage);
      formData.append('FirstName', employeeData.FirstName);
      formData.append('LastName', employeeData.LastName);
      formData.append('Time', getCurrentTime());

      // Append message if it exists and is not empty
      formData.append('message', messageInput.trim() || '.');

      // Append file if it exists
      if (file) {
        formData.append('file', file);
      }

      // sending message to backend
      const response = await axios.post(`http://localhost:8000/api/v1/chats/${employeeID}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Update local state to reflect the new message
      setChats(prevChats => [...prevChats, response.data]); // Assuming response.data contains the new message data from backend
      setMessageInput('');
      setFile(null); // Clear selected file after sending
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  // to get data of particular employee using employeeID
  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/v1/employee/${employeeID}`);
        setEmployeeData(response.data);
      } catch (error) {
        console.error("Error during fetching Employee Data", error);
      }
    };
  
    fetchEmployeeData();
  }, [employeeID]);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const removeFile = () => {
    setFile(null);
  };

  // Function to handle clicking on image
  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl); // Set modalImage state to the clicked image URL
  };

  // Function to close the modal
  const closeModal = () => {
    setModalImage(null); // Clear modalImage state to close the modal
  };

  // Function to scroll chat container to bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
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
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4">
          <div className="flex flex-col space-y-4">
            {chats.map((chat, index) => (
              <div key={index}>
                {index === 0 || chats[index - 1].Date !== chat.Date ? (
                  <div className="text-center text-gray-500 text-sm my-2">
                    {chat.Date}
                  </div>
                ) : null}
                <div className={`flex ${chat.EmployeeID === employeeID ? 'justify-start' : 'justify-end'}`}>
                  {chat.EmployeeID === employeeID ? (
                    <img 
                      className='w-10 h-10 rounded-full object-cover cursor-pointer'
                      src={chat.ProfileImage} 
                      alt="profile" 
                      onClick={() => handleImageClick(chat.ProfileImage)}
                    />
                  ) : null}
                  <div className={`max-w-xs rounded-lg p-3 break-words ${chat.EmployeeID === employeeID ? 'bg-gray-200 text-black self-start ml-2' : 'bg-blue-500 text-white self-end ml-2'}`}>
                    <p className="text-sm leading-tight mb-1">{chat.message}</p>
                    {chat.file && (chat.file.toLowerCase().endsWith('.jpg') || chat.file.toLowerCase().endsWith('.png')) ? (
                      <img 
                        src={chat.file} 
                        alt=""
                        className="max-w-full h-auto rounded-lg mt-1 cursor-pointer"
                        onClick={() => handleImageClick(chat.file)}
                      />
                    ) : null}
                    <span className="text-xs text-gray-500 block mt-1">{chat.Time}</span>
                  </div>
                  {chat.EmployeeID !== employeeID ? (
                    <img 
                      className='w-10 h-10 rounded-full object-cover ml-2 cursor-pointer'
                      src={chat.ProfileImage} 
                      alt="profile" 
                      onClick={() => handleImageClick(chat.ProfileImage)}
                    />
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t border-gray-300 flex items-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            id="fileInput"
            accept="*"
          />
          <label htmlFor="fileInput" className="cursor-pointer ml-2">
            <FiFile className="text-blue-500 text-2xl" />
          </label>
        
          <div className="flex-grow ml-2 relative">
            {file && (
              <div className="flex items-center pr-2">
                <FiFile className="text-gray-500 mr-1" />
                <span className="text-sm truncate">{file.name}</span>
                <button
                  className="ml-2 p-1 rounded-full bg-gray-300 hover:bg-gray-400"
                  onClick={removeFile}
                >
                  <FiX className="text-gray-600" />
                </button>
              </div>
            )}
            <input
              type="text"
              className="w-full p-2 border rounded-lg mt-2"
              placeholder="Type a message..."
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
            />
          </div>
          <button className="ml-2 p-2 bg-blue-500 text-white rounded-full" onClick={sendMessage}>
            <FaPaperPlane />
          </button>
        </div>
      </div>

      {/* Modal for Image Display */}
      {modalImage && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="max-w-screen-lg max-h-screen-lg relative">
            <img src={modalImage} alt="Full size" className="max-w-full max-h-full" />
            <button
              className="absolute top-4 right-4 p-2 rounded-full bg-white text-gray-800"
              onClick={closeModal}
            >
              <FiX className="text-gray-800" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chats;
