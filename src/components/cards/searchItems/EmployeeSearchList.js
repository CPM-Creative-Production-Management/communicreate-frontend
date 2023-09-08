import React, { useEffect } from 'react'
import { SingleEstimationCard } from '../SingleEstimationCard'
import SingleReqCard from '../SingleReqCard'
import TableEmpList from '../../utils/TableEmpList'
import { LoadAnimation } from '../../utils/LoadAnimation'
import not_found from '../../../assets/not_found.json'

const EmployeeSearchList = ({ searchData }) => {
  useEffect(() => {
    console.log(searchData)
  }, [])
  return (
    <div>
      {searchData.length === 0 ?
    
        <LoadAnimation animData={not_found} />
      
        :

        <TableEmpList tableData={searchData} onEmpList={true} />
      }


    </div>
  )
}

export default EmployeeSearchList