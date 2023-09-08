import React, { useEffect } from 'react'
import { SingleEstimationCard } from '../SingleEstimationCard'

const EstimationSearchList = ({searchData}) => {
  useEffect(() => {
    console.log(searchData)
  }, [])
  return (
    <div>
        {searchData?.map((estimation) => (
            <div>
                {/* <h4>{estimation.ReqAgency.Request.name}</h4> */}
                <SingleEstimationCard estimationData={estimation} />
            </div>
        ))}
    </div>
  )
}

export default EstimationSearchList