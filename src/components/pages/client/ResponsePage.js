import React from 'react'
import { useParams } from 'react-router-dom'
import { useApiRequest } from '../../api/useApiRequest'
import { base_url } from '../../..'

const ResponsePage = (params) => {
  const { id } = useParams()
  // const {data, loading, error} = useApiRequest({
  //   url: base_url + 'request/company/response/' + id,
  //   method: 'GET'
  // })
  return (
    <div></div>
  )
}

export default ResponsePage