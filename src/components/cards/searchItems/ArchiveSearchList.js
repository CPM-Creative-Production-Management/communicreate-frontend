import React, { useEffect } from 'react'
import { SingleEstimationCard } from '../SingleEstimationCard'
import { LoadAnimation } from '../../utils/LoadAnimation'
import not_found from '../../../assets/not_found.json'


const ArchiveSearchList = ({ searchData }) => {
  useEffect(() => {
    console.log(searchData)
  }, [])
  return (
    <div>
      {(searchData?.length === 0 || !searchData) ?

        <LoadAnimation animData={not_found} />

        :
        searchData?.map((estimation, index) => (
          <div className='mb-4'>
            {/* <h4>{estimation.ReqAgency.Request.name}</h4> */}
            <SingleEstimationCard
              key={index}
              estimationData={estimation}
              isAgencyArchive={true}
              isArchived={true}
            />
          </div>
        ))
      }
    </div>
  )
}

export default ArchiveSearchList