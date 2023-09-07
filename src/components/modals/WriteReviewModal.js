import React from 'react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Input, TextArea, Button, Form } from 'semantic-ui-react'
import { useRef, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import {regularApiRequest} from '../api/regularApiRequest'
import { base_url } from '../..'
import { showToast } from '../../App'

const WriteReviewModal = (props) => {
    const [title, setTitle] = useState('')
    const [review, setReview] = useState('')
    const [rating, setRating] = useState(0)

    const handleSubmit = async () => {
        console.log(title, review, rating)
        const requestId = props.data.requestId
        const agencyId = props.data.agencyId

        const body = {
            title: title,
            description: review,
            rating: rating
        }
        const response  = await regularApiRequest({
            url: `${base_url}request/${requestId}/agency/${agencyId}/review`,
            method: 'POST',
            reqBody: body
        })
        if (response.status === 200) {
            showToast('Review submitted', 'success')
            props.setShow(false)
            window.location.reload()
        }
    }

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header>
            <Modal.Title>Write Review</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <Input placeholder='Title' fluid onChange={(e) => {setTitle(e.target.value)}}/>
            <br/>
            <Form><TextArea placeholder='Write Review' fluid onChange={(e) => {setReview(e.target.value)}}/></Form>
        
            <h3>Rating</h3>

            <Rating size={30} onClick={(e) => {setRating(e)}}/>
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={() => props.setShow(false)}>Close</Button>
            <Button onClick={() => {
                handleSubmit()
            }}>Submit</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default WriteReviewModal