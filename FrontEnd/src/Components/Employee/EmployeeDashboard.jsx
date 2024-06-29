import React from 'react'
import EmployeeSidebar from './EmployeeSidebar'
import EmployeeTopbar from './EmployeeTopbar'
import EmployeeProfile from './EmployeeProfile'

const EmployeeDashboard = () => {
  return (
    <>
    <div className='ml-[0px]'>
    <EmployeeTopbar/>
    <EmployeeSidebar/>
    <EmployeeProfile/>
    </div>
    </>
  )
}

export default EmployeeDashboard