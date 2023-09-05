import React from 'react'
import { Button } from "semantic-ui-react"
import { Table } from "semantic-ui-react";
import { regularApiRequest } from "../api/regularApiRequest";
import { base_url } from '../../index';

const TableTaskList = ({ paymentId, userType, taskData }) => {

    const initializePayment = async (taskId) => {
        const reqBody = {
            taskId: taskId
        };

        const responseHistory = await regularApiRequest({
            url: base_url + 'payment/' + paymentId + '/init',
            method: 'POST',
            reqBody: reqBody
        })
        console.log("responseHistory URL was : ", responseHistory.data);
        window.location.replace(responseHistory.data);
    }

    return (
        <div>
            <Table celled padded style={{ textAlign: 'center' }}>

                <thead>
                    <tr>
                        <th scope={"col"}>#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Status</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <Table.Body>
                    {taskData?.map((currItem, index) => (
                        <Table.Row key={currItem.id}>
                            <Table.Cell width={1}>
                                {index + 1}
                            </Table.Cell>

                            <Table.Cell>{currItem.name}</Table.Cell>
                            <Table.Cell>{currItem.cost} ৳</Table.Cell>

                            {currItem.status === 2 && <Table.Cell style={{color:"green"}}><b>{"Completed"}</b></Table.Cell>}
                            {(currItem.status === 0 || currItem.status === 1) && <Table.Cell style={{color:"red"}}><b>{"Incomplete"}</b></Table.Cell>}

                            {currItem.isPaid === 1 && userType === 1 && <Table.Cell>
                                <Button disabled>
                                    Paid
                                </Button>
                                </Table.Cell>}
                            {currItem.isPaid === 0 && userType === 1 && <Table.Cell>
                                <Button color='green'
                                     onClick={()=>initializePayment(currItem.id)}>
                                    Pay Now
                                </Button>
                                </Table.Cell>}

                            {currItem.isPaid === 1 && userType === 2 && <Table.Cell style={{color:"green"}}><b>Paid</b></Table.Cell>}
                            {currItem.isPaid === 0 && userType === 2 && <Table.Cell style={{color:"red"}}><b>Unpaid</b></Table.Cell>}
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}
export default TableTaskList
