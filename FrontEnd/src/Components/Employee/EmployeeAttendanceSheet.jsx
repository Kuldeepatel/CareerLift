// import React, { useState, useEffect } from 'react';
// import Sidebar from './EmployeeSidebar';
// import EmployeeTopbar from './EmployeeTopbar';

// function EmployeeAttendanceSheet() {
//   const [attendance, setAttendance] = useState([
//     { date: '2023-02-01', attended: false },
//     { date: '2023-02-02', attended: true },
//     { date: '2023-02-03', attended: false },
//     { date: '2023-02-04', attended: true },
//     { date: '2023-02-05', attended: false },
//     // Add more dates as needed
//   ]);

//   useEffect(() => {
//     // You can fetch attendance data from API or databasehere
//   }, []);


//   return (
//     <>
//     <Sidebar/>
//     <EmployeeTopbar/>
//     <div className="ml-[5%] p-4">
//       <h1 className="text-4xl border-l-[#1B67D9] border-l-4 rounded h-fit pl-4 mb-3 text-slate-700">Employee Attendance Sheet</h1>

//       <h1 className="text-xl font-semibold mb-4">This Month</h1>
//       <table className="w-full table-auto border border-gray-300">
//         <thead>
//           <tr className="bg-gray-200">
//             <th className="px-4 py-2">Date</th>
//             <th className="px-4 py-2">Attendance</th>
//           </tr>
//         </thead>
//         <tbody>
//           {attendance.map((item, index) => (
//             <tr key={index}>
//               <td className="border border-gray-300 px-4 py-2">{item.date}</td>
//               <td className="border border-gray-300 px-4 py-2">
//                 {item.attended ? (
//                   <span className="bg-green-500 text-white py-1 px-2 rounded">Present</span>
//                 ) : (
//                   <span className="bg-red-500 text-white py-1 px-2 rounded">Absent</span>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//     </>
//   );
// }

// export default EmployeeAttendanceSheet;

import React from 'react';
import SideBar from '../SideBar';
import EmployeeTopbar from './EmployeeTopbar';
import Sidebar from './EmployeeSidebar';

function EmployeeAttendanceSheet() {
    const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const daysInMonth = [
      [1, 2, 3, 4, 5, 6],
      [8, 9, 10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19, 20, 21],
      [22, 23, 24, 25, 26, 27, 28],
      [29, 30, 31]
    ];
  
    const getDayClass = (day) => {
      if (day === 9) return 'bg-red-500 text-white';
      if ([2, 6, 7, 13, 16, 20, 23, 27, 30].includes(day)) return 'bg-teal-400 text-white';
      return 'bg-gray-100';
    };
  
    return (
        <div className='overflow-y-auto'>
            <Sidebar/>
            <EmployeeTopbar/>
            <div className='ml-[6%] mt-7'>
                <h1 className="text-4xl border-l-[#1B67D9] border-l-4 rounded h-fit pl-4 mb-3 text-slate-700">Employee Attendance Sheet</h1>
                <h1 className="text-xl font-semibold mb-4">This Month</h1>
            </div>
            <div className="p-4 max-w-4xl h-[100%] mt-8 mx-auto bg-gray-300 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-4">
                <button className="text-lg">&lt;</button>
                <h2 className="text-xl font-bold">July 2024</h2>
                <button className="text-lg">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-2 text-center">
                {daysOfWeek.map((day) => (
                    <div key={day} className="font-semibold">
                    {day}
                    </div>
                ))}
                {daysInMonth.flat().map((day, index) => (
                    <div
                    key={index}
                    className={`p-2 rounded-lg ${getDayClass(day)}`}
                    >
                    {day}
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
  };

export default EmployeeAttendanceSheet;