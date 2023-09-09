import React from 'react'
import { useParams } from 'react-router-dom'
import { useApiRequest } from '../api/useApiRequest'
import { base_url } from '../..'
import { Message } from 'semantic-ui-react'
import {Button} from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../App'

const VerifyPage = () => {
    const { token } = useParams()
    const { data, dataLoading, error } = useApiRequest({
        url: `${base_url}account/verify/${token}`,
        method: 'GET',
    })
    const navigate = useNavigate()

  return (
    <div>
        {
            data &&
            <Message positive>
            <Message.Header>{data.message}</Message.Header>
            <br></br>
            <Button primary onClick={() => {navigate('/login')}}>Login</Button>
        </Message>
            
        }
        {
            error &&
            <center><Message negative>
            <Message.Header>{error.response.data.message}</Message.Header>
        </Message></center>
            
        }
    </div>
  )
}

export default VerifyPage