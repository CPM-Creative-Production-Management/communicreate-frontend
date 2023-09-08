import React from 'react'
import { Modal } from 'react-bootstrap'
import { Button } from 'semantic-ui-react'
import { Rating } from 'react-simple-star-rating'

const SeeReviewModal = (props) => {

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
            <Modal.Header>
                <Modal.Title>Review by {props.data.company?.name}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Rating initialValue={props.data.review?.rating} readonly size={30}/>
                <br />
                <h4>{props.data.review?.description}</h4>
            </Modal.Body>

            <Modal.Footer>
                <Button onClick={() => props.setShow(false)}>Close</Button>
            </Modal.Footer>
    </Modal>
  )
}

export default SeeReviewModal