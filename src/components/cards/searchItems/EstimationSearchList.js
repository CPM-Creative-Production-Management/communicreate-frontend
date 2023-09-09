import React, { useEffect } from 'react'
import { SingleEstimationCard } from '../SingleEstimationCard'
import { LoadAnimation } from '../../utils/LoadAnimation'
import not_found from '../../../assets/not_found.json'


const EstimationSearchList = ({ searchData }) => {
  useEffect(() => {
    console.log(searchData)
  }, [])
  return (
    <div>
      {searchData.length === 0 ?

        <LoadAnimation animData={not_found} />

        :
        searchData?.map((estimation) => (
          <div className='mb-4'>
            {/* <h4>{estimation.ReqAgency.Request.name}</h4> */}
            <SingleEstimationCard estimationData={estimation} isOngoing={true} />
          </div>
        ))
      }
    </div>
  )
}

export default EstimationSearchList