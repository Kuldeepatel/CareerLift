import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import Rating from '@mui/material/Rating';

const Employee = () => {
  const [toggle, setToggle] = useState(false);
  const [techRating, setTechRating] = useState(0);
  const [commRating, setCommRating] = useState(0);
  const [leadRating, setLeadRating] = useState(0);


  console.log(techRating, commRating, leadRating)


  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="relative">
      <button 
        className="p-4 bg-red-800 text-white" 
        onClick={handleToggle}
      >
        Click me
      </button>



      {toggle && (
        <div className=" inset-0 w-full h-full  flex items-center justify-center relative">
          <div className="bg-white p-8 h-full w-[80%] rounded shadow-lg relative text-black">




            <button 
              className="mt-4 p-2 bg-red-800 rounded-lg border flex right-4 top-4 absolute text-white" 
              onClick={handleToggle}>
              <IoMdClose />
            </button>

            <h1 className='text-2xl border-b-2 w-[15%] pb-2 ' >Task Reviews</h1>
            <div className='flex flex-col h-full w-full'>
                <div className="flex text-xl mt-4">
                    <h1 className='w-[50%]' >Task ID : 295 </h1>
                    <h1>Title : Karan</h1>
                </div>
                <div className="flex text-xl mt-2 ">
                    <h1 className='w-[50%] flex' >Description :  <span className="ml-2 w-[70%] " >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Necessitatibus qui odit culpa officiis nam labore illum eligendi beatae ex aliquam.</span> </h1>
                    <h1>Assigned Employee : Jone doe </h1>
                </div>
                

            <div className="flex w-full mt-8  justify-between" >
                


            <div className="flex w-full mt-8 justify-between">
                <div className="flex items-center">
                  <p>Technical Rating: </p>
                  <Rating 
                    name="tech-rating" 
                    value={techRating} 
                    precision={0.5} 
                    onChange={(event, newValue) => {
                      setTechRating(newValue);
                    }} 
                  />
                </div>
                <div className="flex items-center">
                  <p>Soft-skill : </p>
                  <Rating 
                    name="comm-rating" 
                    value={commRating} 
                    precision={0.5} 
                    onChange={(event, newValue) => {
                      setCommRating(newValue);
                    }} 
                  />
                </div>
                <div className="flex items-center">
                  <p>Performance score : </p>
                  <Rating 
                    name="lead-rating" 
                    value={leadRating} 
                    precision={0.5} 
                    onChange={(event, newValue) => {
                      setLeadRating(newValue);
                    }} 
                  />
                </div>
              </div>
            </div>

                <button className="p-2 bg-blue-700 w-fit rounded-md h-fit text-white mt-6">submit</button>
            </div>
          </div>
        </div>
       )}
    </div>
  );
};

export default Employee;