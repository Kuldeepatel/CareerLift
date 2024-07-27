import React, { useState } from 'react';
import axios from 'axios';
import user1 from './assets/Profile_icon.png';
import EmployeeTopbar from './EmployeeTopbar';
import Sidebar from './EmployeeSidebar';

const EmployeeRegistration = () => {
  const [formData, setFormData] = useState({
    profileImage: null,
    FirstName: '',
    MiddleName: '',
    LastName: '',
    DOB: '',
    Gender: '',
    Age: '',
    DateOfJoining: '',
    Position: '',
    EmployeeID: '',
    PhoneNo: '',
    Address: '',
    Salary: '',
    Department: '',
    Qualifications: '',
    Skills: '',
    Awards: '',
    Experience: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          profileImage: file,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const dataToSend = new FormData();
  Object.entries(formData).forEach(([key, value]) => {
    dataToSend.append(key, value);
  });

  try {
    const response = await axios.post('http://localhost:8000/api/v1/employee/signup', dataToSend, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      console.log('Form submitted successfully!');
    } else {
      console.error('Form submission failed:', response.data);
    }
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Server responded with an error:', error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error', error.message);
    }
  }
};


  return (
    <div>
      <Sidebar />
      <EmployeeTopbar />
      <div className="ml-[80px] overflow-hidden">
        <h1 className="text-4xl p-6 bg-white w-full text-slate-600">Employee Registration</h1>
        <div className="flex w-full h-[740px] p-6 rounded-b-md bg-white">
          <form className="relative mt-[-20px]" onSubmit={handleSubmit}>
            <div className="flex w-full h-full">
              <div className="flex w-[200px] mr-12 h-[200px] border-2 rounded-md">
                <div className="w-full flex h-full flex-col">
                  <div className="w-full h-full">
                    <img
                      src={formData.imageUrl || user1}
                      alt="Preview"
                      className="w-full h-[190px]"
                    />
                  </div>
                  <div className="mt-8">
                    <label className="block text-gray-700"></label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full rounded-md"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex gap-[100px]">
                  <div className="flex flex-col">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleChange}
                      className="w-[360px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Middle Name</label>
                    <input
                      type="text"
                      name="MiddleName"
                      value={formData.MiddleName}
                      onChange={handleChange}
                      className="w-[280px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleChange}
                      className="w-[280px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex gap-[100px] mt-6">
                  <div className="flex flex-col">
                    <label>Date of Birth</label>
                    <input
                      type="text"
                      name="DOB"
                      value={formData.DOB}
                      onChange={handleChange}
                      className="w-[300px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Gender</label>
                    <input
                      type="text"
                      name="Gender"
                      value={formData.Gender}
                      onChange={handleChange}
                      className="w-[270px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Age</label>
                    <input
                      type="text"
                      name="Age"
                      value={formData.Age}
                      onChange={handleChange}
                      className="w-[290px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex gap-[100px] mt-6">
                  <div className="flex flex-col">
                    <label>Date of Joining</label>
                    <input
                      type="text"
                      name="DateOfJoining"
                      value={formData.DateOfJoining}
                      onChange={handleChange}
                      className="w-[290px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Employee Position</label>
                    <input
                      type="text"
                      name="Position"
                      value={formData.Position}
                      onChange={handleChange}
                      className="w-[290px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Employee ID</label>
                    <input
                      type="text"
                      name="EmployeeID"
                      value={formData.EmployeeID}
                      onChange={handleChange}
                      className="w-[280px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex gap-[100px] absolute left-0 mt-[320px]">
                  <div className="flex flex-col">
                    <label>Email</label>
                    <input
                      type="text"
                      name="Email"
                      value={formData.Email}
                      onChange={handleChange}
                      className="w-[420px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Password</label>
                    <input
                      type="password"
                      name="Password"
                      value={formData.Password}
                      onChange={handleChange}
                      className="w-[280px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="PhoneNo"
                      value={formData.PhoneNo}
                      onChange={handleChange}
                      className="w-[380px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex gap-[100px] absolute left-0 mt-[420px]">
                  <div className="flex flex-col">
                    <label>Address</label>
                    <input
                      type="text"
                      name="Address"
                      value={formData.Address}
                      onChange={handleChange}
                      className="w-[550px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Salary</label>
                    <input
                      type="text"
                      name="Salary"
                      value={formData.Salary}
                      onChange={handleChange}
                      className="w-[240px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Department</label>
                    <input
                      type="text"
                      name="Department"
                      value={formData.Department}
                      onChange={handleChange}
                      className="w-[270px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex gap-[100px] absolute left-0 mt-[520px]">
                  <div className="flex flex-col">
                    <label>Qualifications</label>
                    <input
                      type="text"
                      name="Qualifications"
                      value={formData.Qualifications}
                      onChange={handleChange}
                      className="w-[300px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Skills</label>
                    <input
                      type="text"
                      name="Skills"
                      value={formData.Skills}
                      onChange={handleChange}
                      className="w-[270px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Awards</label>
                    <input
                      type="text"
                      name="Awards"
                      value={formData.Awards}
                      onChange={handleChange}
                      className="w-[290px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Experience</label>
                    <input
                      type="text"
                      name="Experience"
                      value={formData.Experience}
                      onChange={handleChange}
                      className="w-[270px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
              </div>
            <button
              type="submit"
              className="absolute right-0 mt-[580px] bg-blue-500 text-white p-2 rounded-md"
            >
              Register
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployeeRegistration;
