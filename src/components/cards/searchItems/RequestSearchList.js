import React, { useEffect } from 'react'
import { SingleEstimationCard } from '../SingleEstimationCard'
import SingleReqCard from '../SingleReqCard'
import not_found from '../../../assets/not_found.json'
import { LoadAnimation } from '../../utils/LoadAnimation'


const RequestSearchList = ({ searchData }) => {
  useEffect(() => {
    console.log(searchData)
  }, [])
  return (
    <div>
      {searchData.length === 0 ?

        <LoadAnimation animData={not_found} />

        :
        searchData?.map((estimation) => (
          <div>
            <SingleReqCard reqData={estimation} isOffered={!estimation.accepted} isAccepted={estimation.accepted} />
          </div>
        ))
      }
    </div>
  )
}

export default RequestSearchList