import React, { useEffect } from 'react'
import { SingleEstimationCard } from '../SingleEstimationCard'
import SingleReqCard from '../SingleReqCard'

const RequestSearchList = ({searchData}) => {
  useEffect(() => {
    console.log(searchData)
  }, [])
  return (
    <div>
        {searchData?.map((estimation) => (
            <div>
                <SingleReqCard reqData={estimation} isOffered={!estimation.accepted} isAccepted={estimation.accepted} />
            </div>
        ))}
    </div>
  )
}

export default RequestSearchList