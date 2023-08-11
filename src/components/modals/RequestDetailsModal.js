import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'semantic-ui-react'
import { showToast, globalLoading } from '../../App'
import { regularApiRequest } from '../api/regularApiRequest'
import { useApiRequest } from '../api/useApiRequest'
import { base_url } from '../..'

const RequestDetailsModal = (props) => {

    const details = props.detailsData

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header >
          <Modal.Title>Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h2>{details.name}</h2>
            <p>{details.description}</p>

            <hr></hr>

            <h2>Tasks</h2>
            <hr/>

            {details?.RequestTasks?.map(task => (
                <div>
                     <h3>{task.name}</h3>
                    <p>{task.description}</p>
                    <hr/>
                </div>
            ))}
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => props.setShow(false)}>Close</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default RequestDetailsModal