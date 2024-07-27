import React, { useState, useEffect } from 'react';
import axios from 'axios';
import user1 from './assets/Profile_icon.png';
import SideBar from '../SideBar';
import EmployeeTopbar from './EmployeeTopbar';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeUpdate = () => {
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

  useEffect(() => {
    const fetchEmployeeData = async () => {
      const employee = localStorage.getItem('employee');
      let employeeData;
      if(employee){
        employeeData = JSON.parse(employee);
      }
      console.log(employeeData.EmployeeID)
      const employeeID = employeeData.EmployeeID;
      if (employeeID) {
        try {
          const response = await axios.get(`http://localhost:8000/api/v1/employee/${employeeID}`);
          const employeeData = response.data; 
          console.log("responce data : ",response)
          setFormData(employeeData);
          console.log(employeeData);  // Log employeeData after setting state
        } catch (error) {
          console.error('Error fetching employee data:', error);
          toast.error('Failed to fetch employee details');
        }
      }
    };
  
    fetchEmployeeData();
  }, []);
  
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

    const data = new FormData();
    data.append('profileImage', formData.profileImage);
    for (const key in formData) {
      if (key !== 'profileImage' && key !== 'imageUrl') {
        data.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post('http://localhost:8000/api/v1/employee/update', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Employee details updated successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to update employee details');
    }
  };

  return (
    <>
      <SideBar />
      <EmployeeTopbar />
      <div className="ml-[18%] z-10 pt-[60px] flex flex-col w-[100-18%] h-full p-4 bg-white mt-10">
        <h1 className="text-2xl p-6 bg-white w-full text-slate-600">Update Employee Details</h1>
        <div className="flex w-full h-[720px] p-6 rounded-b-md bg-white">
          <form className="relative mt-[-20px]" onSubmit={handleSubmit}>
            <div className="flex w-full h-full">
              <div className="flex w-[200px] mr-12 h-[200px] border-2 rounded-md">
                <div className="w-full flex h-full flex-col">
                  <div className="w-full h-full">
                    <img src={formData.imageUrl || user1} alt="Preview" className="w-full h-[190px]" />
                  </div>
                  <div className="mt-8">
                    <label className="block text-gray-700">Profile Image</label>
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
                      className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Middle Name</label>
                    <input
                      type="text"
                      name="MiddleName"
                      value={formData.MiddleName}
                      onChange={handleChange}
                      className="w-[200px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleChange}
                      className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex gap-[100px] mt-6">
                  <div className="flex flex-col">
                    <label>Date of Birth</label>
                    <input
                      type="date"
                      name="DOB"
                      value={formData.DOB}
                      onChange={handleChange}
                      className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Gender</label>
                    <input
                      type="text"
                      name="Gender"
                      value={formData.Gender}
                      onChange={handleChange}
                      className="w-[200px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Age</label>
                    <input
                      type="number"
                      name="Age"
                      value={formData.Age}
                      onChange={handleChange}
                      className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex gap-[100px] mt-6">
                  <div className="flex flex-col">
                    <label>Date of Joining</label>
                    <input
                      type="date"
                      name="DateOfJoining"
                      value={formData.DateOfJoining}
                      onChange={handleChange}
                      className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Employee Position</label>
                    <input
                      type="text"
                      name="Position"
                      value={formData.Position}
                      onChange={handleChange}
                      className="w-[200px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Employee ID</label>
                    <input
                      type="text"
                      name="EmployeeID"
                      value={formData.EmployeeID}
                      onChange={handleChange}
                      className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                      disabled // disable editing of Employee ID
                    />
                  </div>
                </div>
                <div className="flex gap-[100px] absolute left-0 mt-[320px]">
                  <div className="flex flex-col">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="PhoneNo"
                      value={formData.PhoneNo}
                      onChange={handleChange}
                      className="w-[350px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Address</label>
                    <input
                      type="text"
                      name="Address"
                      value={formData.Address}
                      onChange={handleChange}
                      className="w-[500px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Salary</label>
                    <input
                      type="text"
                      name="Salary"
                      value={formData.Salary}
                      onChange={handleChange}
                      className="w-[200px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex gap-[100px] absolute left-0 mt-[420px]">
                  <div className="flex flex-col">
                    <label>Department</label>
                    <input
                      type="text"
                      name="Department"
                      value={formData.Department}
                      onChange={handleChange}
                      className="w-[350px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Qualifications</label>
                    <input
                      type="text"
                      name="Qualifications"
                      value={formData.Qualifications}
                      onChange={handleChange}
                      className="w-[500px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
                <div className="flex gap-[100px] absolute left-0 mt-[520px]">
                  <div className="flex flex-col">
                    <label>Awards</label>
                    <input
                      type="text"
                      name="Awards"
                      value={formData.Awards}
                      onChange={handleChange}
                      className="w-[350px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label>Experience</label>
                    <input
                      type="text"
                      name="Experience"
                      value={formData.Experience}
                      onChange={handleChange}
                      className="w-[350px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex mt-[680px] justify-center absolute">
              <button
                type="submit"
                className="w-[300px] h-[40px] flex justify-center bg-blue-700 rounded-md items-center text-white text-xl"
              >
                Update Employee Details
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EmployeeUpdate;
