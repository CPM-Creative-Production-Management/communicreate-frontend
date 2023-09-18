import React from 'react'
import { useApiRequest } from '../../api/useApiRequest';
import { useEffect } from 'react';
import TableEmpList from '../../utils/TableEmpList';
import { base_url } from '../../../index';

const MyEmployeesPage = () => {

  const { data, dataLoading, error } = useApiRequest({
    url: base_url + 'employees',
    method: 'GET',
  })

  const [employees, setEmployees] = React.useState([])

  useEffect(() => {

    if (data) {
      setEmployees(data)
    }
  }, [data])


  return (
    <div>

      <center>
        <h1>Employees</h1>
      </center>

      <TableEmpList tableData={employees} onEmpList={true} setTableData={setEmployees} />
    </div>
  )
}

export default MyEmployeesPage