import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { updateArchives } from '../../../actions'
import { useApiRequest } from '../../api/useApiRequest'
import { regularApiRequest } from '../../api/regularApiRequest'
import { base_url } from '../../../index'
import { Pagination } from 'semantic-ui-react'
import { SingleEstimationCard } from '../../cards/SingleEstimationCard'
import { useEffect, useState } from 'react'

const CompletedProjects = ({ongoing, finished}) => {
  let url_prefix
  if (ongoing) {
    url_prefix = `${base_url}request/company/ongoing/`
  } else {
    if (finished) {
      url_prefix = `${base_url}request/company/finished/`
    } else {
      url_prefix = `${base_url}request/company/rejected/`
    }
  }
  
  const dispatch = useDispatch()
  const globalArchives = useSelector(state => state.archives)
  // dispatch(resetRequests())
  const [activePage, setActivePage] = useState(1)
  const {data, dataLoading, error} = useApiRequest({
    url: `${url_prefix}?page=1`,
    method: 'GET',
  })

  const handlePageChange = async (e) => {
    let url
    if (e.target.text === '⟨') {
      setActivePage(activePage - 1)
      // url = `${base_url}request/company/finished/?page=${activePage - 1}`
      url = `${url_prefix}?page=${activePage - 1}`
    } else if (e.target.text === '⟩') {
      setActivePage(activePage + 1)
      // url = `${base_url}request/company/finished/?page=${activePage + 1}`
      url = `${url_prefix}?page=${activePage + 1}`
    } else {
      setActivePage(parseInt(e.target.text))
      // url = `${base_url}request/company/finished/?page=${e.target.text}`
      url = `${url_prefix}?page=${e.target.text}`
    }

    const {data, dataLoading, error} = await regularApiRequest({
      url: url,
      method: 'GET',
    })

    if (data) {
      dispatch(updateArchives(data.requests))
    }

  }


  useEffect(() => {
    console.log('this is printed still') 
  }, [])

  useEffect(() => {
    if (data) {
      dispatch(updateArchives(data.requests))
    }
  }, [data])
  
  return (
    <div>
      <center className='mb-5'>
        {ongoing && <h1>Ongoing Projects</h1>}
        {finished && <h1>Completed Projects</h1>}
        {!ongoing && !finished && <h1>Rejected Projects</h1>}
      </center>
      { globalArchives?.map((currEstimation, index) => {
          return (
            <div> 
              <SingleEstimationCard 
                key={index} 
                estimationData={currEstimation} 
                isOngoing={true}
                isRejected={false}
                isArchived={false}
                isClientView={true}
              />
            </div>
          )
        })
      }

      <br/>

      <Pagination pointing secondary firstItem={null}
        lastItem={null} defaultActivePage={1} totalPages={data? data.totalPages : 1}
        onPageChange={async (e) => handlePageChange(e)}
      />
    </div>
  )
}

export default CompletedProjects