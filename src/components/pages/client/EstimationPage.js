import React, {useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApiRequest } from '../../api/useApiRequest'
import {regularApiRequest} from '../../api/regularApiRequest'
import { base_url } from '../../..'
import {Card, Table, Button, TextArea, Comment, Header, Icon} from 'semantic-ui-react'
import { showToast } from '../../../App'
import Comments from "../../custom/Comments";
import Textarea from "@mui/joy/Textarea";


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

    const [newComment, setNewComment] = useState('')
    const addComment = async () => {
        // check if comment is empty
        if (newComment.length === 0) {
            showToast('Comment cannot be empty', 'error')
            return
        }

        let commentBody = {
            body: newComment
        }

        console.log('comment body', commentBody)

        const response = await regularApiRequest({
            url: base_url + `estimation/${data.ReqAgency.Estimation.id}/comment`,
            method: 'POST',
            reqBody: commentBody
        })

        console.log('comment response', response)

        if (response && response.status === 200) {
            showToast('Comment added successfully', 'success')
            setNewComment('')
            window.location.reload()
        } else {
            // showToast('Comment could not be added', 'error')
        }


    }

    const handleApprove = async (id) => {
      const response = await regularApiRequest({
        url: base_url + 'estimation/task/approve/' + id,
        method: 'PUT'
      })

      if (response.status === 200) {
        showToast('Task approved', 'success')
        window.location.reload()
      } else {
        showToast('Task could not be approved', 'error')
      }
    }

    const handleRevise = async (id) => {
      const response = await regularApiRequest({
        url: base_url + 'estimation/task/revise/' + id,
        method: 'PUT'
      })
      if (response.status === 200) {
        showToast('Task revised', 'success')
        window.location.reload()
      } else {
        showToast('Task could not be revised', 'error')
      }
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
              {data?.ReqAgency.finalized && <th scope="col">Status</th>}
              <th scope="col">Cost</th>
              {data?.ReqAgency.finalized && <th scope="col">Actions</th>}
          </tr>
        </thead>

        <Table.Body>
          {data?.Tasks?.map((task, index) => (
            <Table.Row>
              <Table.Cell>
                {task.name}
              </Table.Cell>
              {data?.ReqAgency.finalized && (<Table.Cell>
                {task.status === 0 ? 'Pending' : task.status === 1 ? 'Awaiting Approval' : 'Approved'}
              </Table.Cell>)}
              <Table.Cell>
                {task.cost}
              </Table.Cell>
              {data?.ReqAgency.finalized && <Table.Cell>
                {task.status === 0 ? null : task.status === 1 ? <Button positive onClick={() => handleApprove(task.id)}>Approve</Button> : <Button secondary onClick={() => {handleRevise(task.id)}}>Revise</Button>}
              </Table.Cell>}
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

      { data?.ReqAgency.finalized || <Button onClick={handleFinalize} primary>Finalize</Button>}
      { data?.Payment && <Button onClick={() => navigate('/payment/' + data?.Payment?.id)} primary>View Payment Status</Button> }


            <Comment.Group threaded>
                <Header as='h3' dividing>
                    Comments
                </Header>
                {data?
                    <Comments estimationId={data.ReqAgency.Estimation?.id}/>
                    : null}

                <span>
                    <Textarea size="md" name='newComment' value={newComment} onChange={(e) => {
                        setNewComment(e.target.value)
                    }} placeholder='add a comment...'/>

                    <Button className='mt-3' onClick={addComment} primary>
                      <Icon name='send'/> Comment
                    </Button>
                </span>

            </Comment.Group>

        <br/><br/>

    </div>
  )
}

export default EstimationPage