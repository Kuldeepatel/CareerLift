// import React, { useState, useEffect } from 'react';
// import Sidebar from '../Employee/EmployeeSidebar';
// import EmployeeTopbar from '../Employee/EmployeeTopbar';
// import axios from 'axios';

// const PromotionRanking = () => {
//   const [progress, setProgress] = useState(0);
//   const totalDots = 10;
//   const [dots, setDots] = useState(Array(totalDots).fill('inactive'));
//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     // Fetch employees from the backend
//     axios.get('http://localhost:8000/api/v1/predict/promotionranking')
//       .then(response => {
//         const fetchedEmployees = response.data;
//         // Sort employees by PromotionScore in descending order
//         const sortedEmployees = fetchedEmployees.sort((a, b) => b.PromotionScore - a.PromotionScore);
//         setEmployees(sortedEmployees);
        
//         // Set the initial progress based on the first employee's PromotionScore
//         if (sortedEmployees.length > 0) {
//           setProgress(parseFloat(sortedEmployees[0].PromotionScore));
//           console.log(response.data.PromotionScore)
//         }
//       })
//       .catch(error => {
//         console.error("Error fetching employees:", error);
//       });
//   }, []);

//   useEffect(() => {
//     // Create the initial dots
//     const initialDots = Array(totalDots).fill('inactive');
//     setDots(initialDots);

//     // Animate the dots one by one after the component mounts
//     const timer = setTimeout(() => {
//       const activeDots = Math.round((progress / 100) * totalDots);
//       const updatedDots = Array(totalDots).fill('inactive');
//       for (let i = 0; i < activeDots; i++) {
//         setTimeout(() => {
//           setDots(prevDots => {
//             const newDots = [...prevDots];
//             newDots[i] = 'active';
//             return newDots;
//           });
//         }, i * 100); // Delay each dot animation
//       }
//     }, 100); // Initial delay to start animation

//     // Clean up the timer if the component unmounts
//     return () => clearTimeout(timer);
//   }, [progress]);

//   return (
//     <div>
//       <Sidebar />
//       <EmployeeTopbar />
//       <div className="p-6 ml-[6%] bg-white min-h-screen">
//         <div className="flex items-center justify-between pt-[1%] pb-[1%] border-gray-300">
//           <h1 className="text-4xl border-l-[#1B67D9] border-l-4 rounded h-fit pl-4 text-slate-700">Ranking</h1>
//         </div>
//         <div className="flex justify-center gap-4 mb-8">
//           {employees.slice(0, 3).map((user, index) => (
//             <div key={user.EmployeeID} className="border-2 shadow-md even:w-[40%] even:border-yellow-300 text-black p-4 rounded-lg text-center w-1/3">
//               <img src={user.ProfileImage} alt={user.FirstName} className="w-16 h-16 rounded-full mx-auto mb-4" />
//               <h2 className="text-xl font-semibold">{user.FirstName} {user.LastName}</h2>
//               <p className="text-sm">ID: {user.EmployeeID}</p>
//               <p className="text-2xl font-bold mt-2">Score {user.PromotionScore}%</p>
//               <p className="mt-1">Rank #{index + 1}</p>
//             </div>
//           ))}
//         </div>

//         <div className="flex h-[400px] snap-y w-full relative border-2 rounded-md mt-4 overflow-y-auto">
//           <div className="h-full w-full absolute">
//             <div className="text-black rounded-lg">
//               <div className="grid grid-cols-4 font-bold text-center p-4 border-b border text-lg text-gray-600">
//                 <div>RANK</div>
//                 <div>ID</div>
//                 <div>NAME</div>
//                 <div className="text-center">SCORE</div>
//               </div>
//               {employees.slice(3).map((user, index) => (
//                 <div key={user.EmployeeID} className="grid grid-cols-4 bg-gray-100 hover:bg-gray-200 odd:bg-white text-center p-2 border-b border text-md font-semibold text-gray-600">
//                   <div>#{index + 4}</div>
//                   <div className="text-center">{user.EmployeeID}</div>
//                   <div className="flex">
//                     <img src={user.ProfileImage} alt={user.FirstName} className="w-8 ml-14 h-8 rounded-full text-right" />
//                     <div className="ml-2">{user.FirstName} {user.LastName}</div>
//                   </div>
//                   <div className="flex items-center">
//                     <div className="flex gap-[2px] ml-[80px] w-[250px]">
//                       {dots.map((status, i) => (
//                         <div
//                           key={i}
//                           className={`w-[8px] h-2 rounded-full transition-transform duration-500 ease-in-out ${status === 'active' ? 'bg-purple-700 transform scale-100 opacity-100' : 'bg-gray-300 transform scale-50 opacity-50'}`}
//                           style={{ transitionDelay: `${i * 100}ms` }}
//                         ></div>
//                       ))}
//                     </div>
//                     <div className="text-lg mr-[100px] font-semibold text-gray-600">
//                       {user.PromotionScore}%
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PromotionRanking;
import React, { useState, useEffect } from 'react';
import Sidebar from '../Employee/EmployeeSidebar';
import EmployeeTopbar from '../Employee/EmployeeTopbar';
import axios from 'axios';

const PromotionRanking = () => {
  const totalDots = 10;
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    // Fetch employees from the backend
    axios.get('http://localhost:8000/api/v1/predict/promotionranking')
      .then(response => {
        const fetchedEmployees = response.data.filter(sp => sp.Promotion == "Eligible");
        
        const sortedEmployees = fetchedEmployees.sort((a, b) => b.PromotionScore - a.PromotionScore);
        setEmployees(sortedEmployees);
        console.log(fetchedEmployees.EmployeeID)
      })
      .catch(error => {
        console.error("Error fetching employees:", error);
      });
  }, []);

  const getDots = (score) => {
    const activeDots = Math.round((score / 100) * totalDots);
    return Array.from({ length: totalDots }, (_, i) => (i < activeDots ? 'active' : 'inactive'));
  };

  return (
    <div className='overflow-y-auto'>
      <Sidebar />
      <EmployeeTopbar />
      <div className="p-6 ml-[6%] bg-white min-h-screen">
        <div className="flex items-center justify-between pt-[1%] pb-[1%] border-gray-300">
          <h1 className="text-4xl border-l-[#1B67D9] border-l-4 rounded h-fit pl-4 text-slate-700">Ranking</h1>
        </div>
        <div className="flex justify-center gap-4 mb-8">
          {employees.slice(0, 3).map((user, index) => (
            <div key={user.EmployeeID} className="border-2 shadow-md first:w-[40%] first:border-yellow-300 text-black p-4 rounded-lg text-center w-1/3">
              <img src={user.ProfileImage} alt={user.FirstName} className="w-16 h-16 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold">{user.FirstName} {user.LastName}</h2>
              <p className="text-sm">ID: {user.EmployeeID}</p>
              <p className="text-2xl font-bold mt-2">Score {user.PromotionScore}%</p>
              <p className="mt-1">Rank #{index + 1}</p>
            </div>
          ))}
        </div>

        <div className="flex h-[400px] snap-y w-full relative border-2 rounded-md mt-4 overflow-y-auto">
          <div className="h-full w-full absolute">
            <div className="text-black rounded-lg">
              <div className="grid grid-cols-4 font-bold text-center p-4 border-b border text-lg text-gray-600">
                <div>RANK</div>
                <div>ID</div>
                <div>NAME</div>
                <div className="text-center">SCORE</div>
              </div>
              {employees.slice(3).map((user, index) => (
                <div key={user.EmployeeID} className="grid grid-cols-4 bg-gray-100 hover:bg-gray-200 odd:bg-white text-center p-2 border-b border text-md font-semibold text-gray-600">
                  <div>#{index + 4}</div>
                  <div className="text-center">{user.EmployeeID}</div>
                  <div className="flex">
                    <img src={user.ProfileImage} alt={user.FirstName} className="w-8 ml-14 h-8 rounded-full text-right" />
                    <div className="ml-2">{user.FirstName} {user.LastName}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="flex gap-[2px] ml-[80px] w-[250px]">
                      {getDots(user.PromotionScore).map((status, i) => (
                        <div
                          key={i}
                          className={`w-[8px] h-2 rounded-full transition-transform duration-500 ease-in-out ${status === 'active' ? 'bg-purple-700 transform scale-100 opacity-100' : 'bg-gray-300 transform scale-50 opacity-50'}`}
                          style={{ transitionDelay: `${i * 100}ms` }}
                        ></div>
                      ))}
                    </div>
                    <div className="text-lg mr-[100px] font-semibold text-gray-600">
                      {user.PromotionScore}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionRanking;
