import React from 'react'
import { useApiRequest } from '../../api/useApiRequest';
import { useEffect } from 'react';
import TableEmpList from '../../utils/TableEmpList';
import { base_url } from '../../../index';

const MyEmployeesPage = () => {

    const {data, dataLoading, error} = useApiRequest({
        url: base_url + 'employees',
        method: 'GET',
    })

  return (
    <div>
        <br></br>
        
        <h1>Employees</h1>
        <TableEmpList tableData={data} onEmpList={true}/>
    </div>  
  )
}

export default MyEmployeesPage