import React from 'react'
import { useNavigate } from 'react-router-dom';
import ResponsiveNavbar from "../ResponsiveNavbar";
import {SidebarPro} from "../SidebarPro";
import "./pages.css"
import { useApiRequest } from '../api/useApiRequest';
import { useEffect } from 'react';
import { useState } from 'react';
import { base_url } from '../..'
import TableEmpList from '../TableEmpList';
import EditEmployeeModal from '../modals/EditEmployeeModal';
import { Button } from 'semantic-ui-react';

const MyEmployeesPage = () => {
    const [editEmployeeModal, setEditEmployeeModal] = useState(false)

    const {data, dataLoading, error} = useApiRequest({
        url: base_url + 'employees',
        method: 'GET',
    })

    useEffect(() => {
        console.log('loading', dataLoading)
        console.log('employeeData', data)
    }, [dataLoading, data])

  return (
    <div>
        <br></br>
        
        <h1>Employees</h1>
        <TableEmpList tableData={data} isDisplaying={true}/>
        {/* {dataLoading?<div/>:<TableEmpList tableData={data} isDisplaying={true}/>} */}
    </div>  
  )
}

export default MyEmployeesPage