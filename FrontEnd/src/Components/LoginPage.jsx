import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Lottie from 'lottie-react';
import loginanimation from '../assets/loginanimation.json';
import backgroundImage from '../assets/background.png';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await axios.post('http://localhost:8000/api/v1/employee/signin', {
        Email: email,
        Password: password,
      }, { withCredentials: true });

      if (response && response.data && response.data.user) {
        const employee = response.data.user;
        localStorage.setItem('employee', JSON.stringify(employee));
          
        if (employee.Position === 'HR') {
          navigate('/hrdashboard');
        } else {
          console.log("EmployeeID at login : ",employee.EmployeeID)
          navigate('/employeedashboard');
        }
      } else {
        setError('Unexpected response format'); 
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="flex">
      <div
        id="background"
        className="w-[60vw] h-screen relative overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <h1 className="text-[#f0eeeef4] ml-4 mt-4 font-bold text-xl">CareerLift</h1>
        <div className="absolute top-1/2 left-[30%] transform -translate-x-1/2 -translate-y-1/2">
          <Lottie animationData={loginanimation} />
        </div>
      </div>
      <div className="absolute md:top-[35%] md:right-[18%]">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Your email address"
            className="mb-4 p-2 w-[300px] rounded-lg border border-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 w-[300px] rounded-lg border border-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="mb-4 p-2 w-[200px] bg-[#1B67D9] text-white rounded-lg">
            Login
          </button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
