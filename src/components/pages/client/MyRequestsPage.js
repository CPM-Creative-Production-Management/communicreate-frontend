import React from 'react'
import { Card, Table, Button } from 'semantic-ui-react'
import { useApiRequest } from '../../api/useApiRequest';
import { useState } from 'react';
import { useEffect } from 'react';
import { base_url } from '../../..';
import RequestDetailsModal from '../../modals/RequestDetailsModal';
import { regularApiRequest } from '../../api/regularApiRequest';
import ResponsePage from './ResponsePage';
import ResponsesModal from '../../modals/ResponsesModal';


const MyRequestsPage = () => {

    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [detailsData, setDetailsData] = useState({})
    const [responses, setResponses] = useState({})
    const [showResponsesModal, setShowResponsesModal] = useState(false)

    const {data, loading, error} = useApiRequest({
        url: base_url + 'request/company',
        method: 'GET'
    })

    const redCircleStyle = {
        width: '8px',
        height: '8px',
        backgroundColor: 'red',
        borderRadius: '50%',
        marginRight: '10px', // Add spacing between text and circle
    };

    const greenCircleStyle = {
        width: '8px',
        height: '8px',
        backgroundColor: 'green',
        borderRadius: '50%',
        marginRight: '10px', // Add spacing between text and circle
    };

    const containerStyle = {
        display: 'inline-flex', // Change to inline-flex
        alignItems: 'center',
    };

    const handleDetails = async (e) => {
        const index = e.target.name.split('-')[1]
        const request_id = data[index].id
        const response = await regularApiRequest({
            url: base_url + 'request/' + request_id,
            method: 'GET'
        })
        console.log(response)
        setDetailsData(response.data)
        setShowDetailsModal(true)
    }

    const handleRequests = async (e) => {
        const index = e.target.name.split('-')[1]
        console.log(data[index].id)
        const response = await regularApiRequest({
            url: base_url + 'request/company/' + data[index].id + '/responses',
            method: 'GET'
        })
        console.log(response)
        setResponses(response.data)
        setShowResponsesModal(true)
        console.log(showResponsesModal)
    }

  return (
    <div>
        <br/>
        <h1>My Requests</h1>
        <br/>
            <Table>
            <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Response Deadline</th>
                        <th scope="col">Completion Deadline</th>
                        <th scope="col">Status</th>
                        <th scope="col">Responses</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>

                <Table.Body>
                    {data?.map((request, index) => (
                        <Table.Row>
                            <Table.Cell>
                                {request.name}
                            </Table.Cell>
                            <Table.Cell>
                                {request.res_deadline}
                            </Table.Cell>
                            <Table.Cell>
                                {request.comp_deadline}
                            </Table.Cell>
                            <Table.Cell>
                                {request.responses === 0 ? <div style={containerStyle}>
                                    <div style={redCircleStyle}></div>
                                    <p>{request.responses} responses</p>
                                </div> : <div style={containerStyle}>
                                    <div style={greenCircleStyle}></div>
                                    <p>{request.responses} responses </p>
                                </div>}
                            </Table.Cell>
                            <Table.Cell width={2}>
                                    <Button name={'r-' + index} onClick={handleRequests} className='mr-3' disabled={request.responses === 0}>View Responses</Button>
                            </Table.Cell>
                            <Table.Cell width={2}>
                                <Button name={'d-' + index} onClick={handleDetails} className='mr-3'>View Details</Button>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
            
            <RequestDetailsModal show={showDetailsModal} setShow={setShowDetailsModal} detailsData={detailsData} setDetailsData={setDetailsData} />
            <ResponsesModal show={showResponsesModal} setShow={setShowResponsesModal} responses={responses} setResponses={setResponses} />
    </div>
  )
}

export default MyRequestsPage