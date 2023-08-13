import React from 'react'
import { useParams } from 'react-router-dom'
import { useApiRequest } from '../../api/useApiRequest'
import { base_url } from '../../..'
import { Card, Table, Button, TextArea } from 'semantic-ui-react'


const EstimationPage = (params) => {
  const { id } = useParams()
  const {data, loading, error} = useApiRequest({
    url: base_url + 'estimation/' + id,
    method: 'GET'
  })
  return (
    <div>
      <br/>
      <br/>
      <Card className='p-4' fluid>
        <center>
          <h2>{data?.title}</h2>
          <h3>Estimation by: {data?.ReqAgency.Company.name}</h3>
        </center>
      </Card>

      <Table>
        <thead>
          <tr>
              <th scope="col">Task</th>
              <th scope="col">Description</th>
              <th scope="col">Status</th>
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
                {task.description}
              </Table.Cell>
              <Table.Cell>
                Incomplete
              </Table.Cell>
              <Table.Cell>
                {task.cost}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <Card className='p-4' fluid>
        <div className='d-flex justify-content-between'>
          <h3>Total Cost: {data?.cost}</h3>

          
        </div>
      </Card>

      <Button primary>Finalize</Button>

      <hr/>
      <h4>Don't like the estimation? Write a comment below to contact the agency further.</h4>
      <hr/>

      <h2>Comments</h2>

      {data?.Comments.length === 0 && <h3>It seems like there are no comments yet. Start a conversation by writing a comment below!</h3>}

      {data?.Comments.map((comment, index) => (
        <Card className='p-4' fluid>
          <Card.Meta className='mb-3'>
            <h4>{comment.User.name}</h4>
            <h5>Email: {comment.User.email}</h5>
            <h5>Posted On: {comment.createdAt}</h5>
          </Card.Meta>
          <hr></hr>
          <h3>{comment.body}</h3>
        </Card>
      ))}

        <hr/>

        <h3>Write a comment</h3>
        <TextArea fluid placeholder='Write a comment...' style={{ "width": "100%" }} />
    </div>
  )
}

export default EstimationPage