import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApiRequest } from '../../api/useApiRequest'
import {regularApiRequest} from '../../api/regularApiRequest'
import { base_url } from '../../..'
import { Card, Table, Button, TextArea } from 'semantic-ui-react'
import { showToast } from '../../../App'


const EstimationPage = (params) => {
  const { rid, aid } = useParams()
  const navigate = useNavigate()
  const {data, loading, error} = useApiRequest({
    url: base_url + 'estimation/request/' + rid + '/agency/' + aid,
    method: 'GET'
  })

  const handleFinalize = async () => {
    const response = await regularApiRequest({
      url: base_url + 'request/' + rid + '/agency/' + aid + '/finalize',
      method: 'POST'
    })
    navigate('/request/' + rid + '/agency/' + aid + '/finalize')
  }

  return (
    <div>
      <br/>
      <br/>
      <Card className='p-4' fluid>
        <center>
          <h2>{data?.ReqAgency.Request.name}</h2>
          <h3>Estimation by: {data?.ReqAgency.Agency.name}</h3>
        </center>
      </Card>

      <Table>
        <thead>
          <tr>
              <th scope="col">Task</th>
              <th scope="col">Cost</th>
          </tr>
        </thead>

        <Table.Body>
          {data?.Tasks?.map((task, index) => (
            <Table.Row>
              <Table.Cell>
                {task.name}
              </Table.Cell>
              <Table.Cell>
                {task.cost}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Card className='p-4' fluid>
        <div>
          <h3>Extra Cost: {data?.extraCost}</h3>
          <h3>Total Cost: {data?.cost}</h3>
          
        </div>
      </Card>

      <Button onClick={handleFinalize} primary>Finalize</Button>

    </div>
  )
}

export default EstimationPage