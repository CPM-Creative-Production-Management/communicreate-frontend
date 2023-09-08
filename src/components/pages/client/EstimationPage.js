import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useApiRequest } from '../../api/useApiRequest'
import { regularApiRequest } from '../../api/regularApiRequest'
import { base_url } from '../../..'
import { Card, Table, Button, TextArea, Comment, Header, Icon, Message } from 'semantic-ui-react'
import { showToast } from '../../../App'
import Comments from "../../custom/Comments";
import Textarea from "@mui/joy/Textarea";
import { set } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { updateComments } from '../../../actions'
import { commentApiRequest } from '../../api/commentApiRequest'



const EstimationPage = (params) => {

  const globalComments = useSelector(state => state.comments)
  // dispatch an action to the reducer
  const dispatch = useDispatch()

  const { rid, aid } = useParams()
  const navigate = useNavigate()

  const [tasks, setTasks] = useState([]) // 0: pending, 1: approved, 2: reviewed
  const [finishButton, setFinishButton] = useState(false)
  const [discardButton, setDiscardButton] = useState(false)
  const [commentPosting, setCommentPosting] = useState(false)
  const [newComment, setNewComment] = useState('')

  const handleApprove = async (task) => {
    const response = await regularApiRequest({
      url: base_url + 'estimation/task/approve/' + task.id,
      method: 'PUT'
    })

    if (response.status === 200) {
      showToast('Task approved', 'success')
      setTasks(tasks.map((t) => {
        if (t.id === task.id) {
          t.status = 2
        }
        return t
      }))
      setFinishButton(tasks.every((t) => t.status === 2))
    } else {
      showToast('Task could not be approved', 'error')
    }
  }

  const { data, loading, error } = useApiRequest({
    url: base_url + 'estimation/request/' + rid + '/agency/' + aid,
    method: 'GET'
  })

  useEffect(() => {
    if (data) {
      setTasks(data.Tasks)
      setDiscardButton(!data.is_completed)
      setFinishButton(data.Tasks.every((t) => t.status === 2) && !data.is_completed)
    }
  }, [data])

  const handleFinalize = async () => {
    navigate('/request/' + rid + '/agency/' + aid + '/finalize')
  }


  const handleFinish = async (id) => {
    try {
      const response = await regularApiRequest({
        url: base_url + 'estimation/finish/' + id,
        method: 'PUT'
      })
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const handleDiscard = async (id) => {
    try {
      const response = await regularApiRequest({
        url: base_url + 'estimation/discard/' + id,
        method: 'PUT'
      })
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }

  const handleRevise = async (task) => {
    const response = await regularApiRequest({
      url: base_url + 'estimation/task/review/' + task.id,
      method: 'PUT'
    })
    if (response.status === 200) {
      showToast('Task sent for reviewing', 'success')
      setTasks(tasks.map((t) => {
        if (t.id === task.id) {
          t.status = 0
        }
        return t
      }))
      setFinishButton(false)
    } else {
      showToast('Task could not be reviewed', 'error')
    }

  }

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

    setCommentPosting(true)
    const response = await commentApiRequest({
      url: base_url + `estimation/${data.ReqAgency.Estimation.id}/comment`,
      method: 'POST',
      reqBody: commentBody
    })

    console.log('comment response', response)

    if (response && response.status === 200) {
      showToast('Comment added successfully', 'success')
      setNewComment('')
      setCommentPosting(false)
      dispatch(updateComments([...globalComments, response.data.comment]));
    } else {
      // showToast('Comment could not be added', 'error')
    }
  }

  return (
    <div>
      <br />
      <br />
      {
        data?.is_completed && <Message positive>
          <Message.Header>Project Completed</Message.Header>
          <p>This project has been completed.</p>
        </Message>
      }

      {
        data?.is_rejected && <Message negative>
          <Message.Header>Project Rejected</Message.Header>
          <p>This project has been rejected.</p>
        </Message>
      }
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
          {tasks.map((task, index) => (
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

              {data?.ReqAgency.finalized && !data?.is_completed && !data?.is_rejected && <Table.Cell>
                {task.status === 0 ? null : task.status === 1 ? <span><Button positive onClick={() => handleApprove(task)}>Approve</Button> <Button negative onClick={() => handleRevise(task.id)}>Review</Button></span> : <Button negative onClick={() => {handleRevise(task)}}>Review</Button>}

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
      { data?.ReqAgency?.finalized && !data?.is_completed && !data?.is_rejected &&
        <Button onClick={() => {handleFinish(data?.id)}} primary disabled={!finishButton}>Finish Project</Button>
      }

      { data?.ReqAgency?.finalized && !data?.is_completed && !data?.is_rejected &&
        <Button onClick={() => {handleDiscard(data?.id)}} negative disabled={!discardButton}>Discard Project</Button>
      }


      <Comment.Group threaded>
        <Header as='h3' dividing>
          Comments
        </Header>
        {data ?
          <Comments estimationId={data.ReqAgency.Estimation?.id} />
          : null}

        <span>
          <Textarea size="md" name='newComment' value={newComment} onChange={(e) => {
            setNewComment(e.target.value)
          }} placeholder='add a comment...' />

          <Button loading={commentPosting} className='mt-3' onClick={addComment} primary>
            <Icon name='send' /> Comment
          </Button>
        </span>

      </Comment.Group>

      <br /><br />

    </div>
  )
}

export default EstimationPage