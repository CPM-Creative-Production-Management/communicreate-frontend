import React from 'react'
import { Button, Card, Grid } from 'semantic-ui-react'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'



const ResponsesModal = (props) => {
    const responses = props.responses
    const reqAgencies = responses.ReqAgencies
    let navigate = useNavigate()
  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
        <Modal.Header>
            <Modal.Title>{responses.name} - Responses</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            {reqAgencies?.map((currAgency, index) => (
                <Card className='p-4' fluid>
                    <Card.Meta className='mb-3'>
                        <h3>{currAgency.Agency.name}</h3>
                        <h3>Address: {currAgency.Agency.address}</h3>
                        <h3>Email: {currAgency.Agency.email}</h3>
                    </Card.Meta>
                    {currAgency.cost? <h3>Suggested Cost: {currAgency.cost}</h3> : <h3>Estimation Not Received</h3>}
                    {currAgency.cost ? <Button onClick={() => navigate('/estimation/' + currAgency.estimationId)}>View Estimation</Button>: <Button disabled>View Estimation</Button>}
                    
                </Card> 
            )
            )}
        </Modal.Body>

        <Modal.Footer>
            <Button onClick={() => props.setShow(false)}>Close</Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ResponsesModal