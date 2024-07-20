import React, { useState } from 'react';
import EmployeeSidebar from './EmployeeSidebar'
import EmployeeTopbar from './EmployeeTopbar'

const EmployeeDetail = () => {
    const image = 'https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?cs=srgb&dl=pexels-anjana-c-169994-674010.jpg&fm=jpg'
  const [formData, setFormData] = useState({
    image: null,
    imageUrl: '',
    firstName: '',
    middleName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    age: '',
    dateOfJoining: '',
    position: '',
    employeeId: '',
    email: '',
    password: '',
    phoneNumber: '',
    address: '',
    salary: '',
    department: '',
    qualification: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: file,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='ml-[0px]'>
        <EmployeeTopbar/>
        <EmployeeSidebar/>
      <h1 className="text-2xl ml-[60px] p-6 bg-white text-slate-600">Employee Registration</h1>
      <div className="flex w-full h-[720px] p-6 rounded-b-md bg-white">
        <form className="relative mt-[-20px]" onSubmit={handleSubmit}>
          <div className="flex w-full h-full">
            <div className="flex w-[200px] mr-12 h-[200px] border-2 rounded-md">
              <div className="w-full flex h-full flex-col">
                <div className="w-full h-full">
                  <img
                    src={image}
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
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Middle Name</label>
                  <input
                    type="text"
                    name="middleName"
                    value={formData.middleName}
                    onChange={handleChange}
                    className="w-[200px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
              </div>
              <div className="flex gap-[100px] mt-6">
                <div className="flex flex-col">
                  <label>Date of Birth</label>
                  <input
                    type="text"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-[200px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Age</label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
              </div>
              <div className="flex gap-[100px] mt-6">
                <div className="flex flex-col">
                  <label>Date of Joining</label>
                  <input
                    type="text"
                    name="dateOfJoining"
                    value={formData.dateOfJoining}
                    onChange={handleChange}
                    className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Employee Position</label>
                  <input
                    type="text"
                    name="position"
                    value={formData.position}
                    onChange={handleChange}
                    className="w-[200px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={formData.employeeId}
                    onChange={handleChange}
                    className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
              </div>
              <div className="flex gap-[100px] absolute left-0 mt-[320px]">
                <div className="flex flex-col">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-[350px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-[350px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
              </div>
              <div className="flex gap-[100px] absolute left-0 mt-[420px]">
                <div className="flex flex-col">
                  <label>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-[500px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Salary</label>
                  <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    className="w-[200px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Department</label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    className="w-[250px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
              </div>
              <div className="flex gap-[100px] absolute left-0 mt-[520px]">
                <div className="flex flex-col">
                  <label>Qualification</label>
                  <input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    className="w-[350px] p-2 focus:outline-none mt-4 h-10 rounded-md border"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="p-4 w-fit h-fit rounded-md bottom-4 bg-[#1B67D9] px-8 right-0 absolute text-white tracking-wide"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeDetail;