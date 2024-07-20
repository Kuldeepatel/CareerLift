import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginPage.jsx';
import HRDashboard from './Components/HR/HRDashboard.jsx';
import EmployeeDashboard from './Components/Employee/EmployeeDashboard.jsx';
import Attendance from './Components/Attandance.jsx';
import PromotionRanking from './Components/HR/PromotionRanking.jsx';
import EmployeeProfile from './Components/Employee/EmployeeProfile.jsx';
import Chats from './Components/Chats.jsx';
import EmployeeDetail from './Components/Employee/EmployeeDetail.jsx';
import TaskManagement from './Components/Task/TaskManagement.jsx';
import EmployeeList from './Components/Employee/EmployeeList.jsx';
import Createtask from './Components/Task/tasks.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/employeedashboard' element={<EmployeeDashboard/>}/>
        <Route path='/hrdashboard' element={<HRDashboard/>}/>
        <Route path="/" element={<LoginPage />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path = '/promotionranking' element = {<PromotionRanking/>}></Route>
        <Route path = '/profile' element = {<EmployeeProfile/>}></Route>
        <Route path = '/chats/:employeeID' element = {<Chats/>}></Route>
        <Route path = '/employeeDetail' element = {<EmployeeDetail/>}></Route>
        <Route path = '/task' element = {<TaskManagement/>}></Route>
        <Route path = '/tasks' element = {<Createtask/>}></Route>
        <Route path = '/employee' element = {<EmployeeList/>}></Route>
        <Route path = '/completionreview' element = {<completionreview/>}></Route>
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
