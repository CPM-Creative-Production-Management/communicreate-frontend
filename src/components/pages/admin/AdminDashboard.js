import React from 'react'
import { TableUnverifiedUserList } from '../../utils/TableUnverifiedUserList'
import { useNavigate } from 'react-router-dom'
import { useApiRequest } from '../../api/useApiRequest'
import { base_url } from '../../..'

const AdminDashboard = () => {

  const { data, dataLoading: requestsLoading, error } = useApiRequest({
    url: base_url + 'admin/dashboard',
    method: 'GET',
  })

  return (
    <div>
      <h2>Unverified Users</h2>
      { data && <TableUnverifiedUserList tableData={data.unverifiedUsers} />}

    </div>
  )
}

export { AdminDashboard }