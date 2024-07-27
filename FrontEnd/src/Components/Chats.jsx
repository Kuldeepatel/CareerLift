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
  const [modalImage, setModalImage] = useState(null);
  const chatContainerRef = useRef(null);

  // to get current time
  const getCurrentTime = () => {
    const currentDate = new Date();
    let hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
  
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
    setModalImage(imageUrl); 
  };

  // Function to close the modal
  const closeModal = () => {
    setModalImage(null); 
  };

  // Function to scroll chat container to bottom
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Function to handle PDF file download
  const handlePdfDownload = (pdfUrl) => {
    axios({
      url: pdfUrl,
      method: 'GET',
      responseType: 'blob', // important
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'download.pdf');
      document.body.appendChild(link);
      link.click();
    });
  };
  
  //DESIGN CODE 
  return (
    <div>
      <EmployeeTopbar bgColor='bg-red-500' />
      <div className="flex h-screen bg-gray-100">
        <SideBar />
        {/* Chat Area */}
        <div className="ml-[18%] flex flex-col w-full h-full p-4">
          {/* Chat Header */}
          <div className="flex items-center justify-between pt-[3%] pb-[1%] border-b border-gray-300">
            <h1 className="text-4xl border-l-[#1B67D9] border-l-4 rounded h-fit pl-4 text-slate-700">Chats</h1>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4" ref={chatContainerRef}>
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
    </div>
  );
};

export default Chats;
