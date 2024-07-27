import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage.jsx';
import HRDashboard from './Components/HR/HRDashboard.jsx';
import EmployeeDashboard from './Components/Employee/EmployeeDashboard.jsx';
import Attendance from './Components/Attandance.jsx';
import PromotionRanking from './Components/HR/PromotionRanking.jsx';
import EmployeeProfile from './Components/Employee/EmployeeProfile.jsx';
import Chats from './Components/Chats.jsx';
import EmployeeList from './Components/Employee/EmployeeList.jsx';
import TaskManagement from './Components/Task/TaskManagement.jsx'
//import Tasks from './Components/Employee/Tasks.jsx'
import Tasks from './Components/Task/tasks.jsx'

import EmployeeDetail from './Components/Employee/EmployeeDetail.jsx'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/employeedashboard' element={<EmployeeDashboard/>}/>
        <Route path='/hrdashboard' element={<HRDashboard/>}/>
        <Route path="/" element={<LoginPage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/employeelist" element={<EmployeeList />} />
        <Route path = '/promotionranking' element = {<PromotionRanking/>}></Route>
        <Route path = '/profile' element = {<EmployeeDetail/>}></Route>
        <Route path = '/chats/:employeeID' element = {<Chats/>}></Route>
        <Route path = '/task' element = {<TaskManagement/>}></Route>
        <Route path = '/createtask' element = {<Tasks/>}></Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
