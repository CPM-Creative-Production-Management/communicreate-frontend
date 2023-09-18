import React, { useEffect } from 'react'
import { Button, Table } from "semantic-ui-react";
import { base_url } from '../../index';
import { regularApiRequest } from "../api/regularApiRequest";

const TableUnverifiedUserList = ({ tableData }) => {

    const verifyUser = async (id) => {
        const reqBody = {
            id: id
        };

        const response = await regularApiRequest({
            url: base_url + 'admin/verifyUser/' + id,
            method: 'PUT',
            reqBody: reqBody
        })
    }

    const rejectUser = async (id) => {
        const reqBody = {
            id: id
        };

        const response = await regularApiRequest({
            url: base_url + 'admin/rejectUser/' + id,
            method: 'POST',
            reqBody: reqBody
        })
    }

    return (
        <div>

            <Table celled padded className='mt-3' style={{ textAlign: 'center' }}>

                <thead>
                    <tr>
                        <th scope={"col"}>#</th>
                        <th scope="col" >Name</th>
                        <th scope="col" >Type</th>
                        <th scope="col">Email</th>
                        <th scope="col">Address</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Association</th>
                        <th scope="col">Association Email</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>

                <Table.Body>
                    {tableData?.map((currItem, index) => (
                        <Table.Row key={currItem.id}>
                            <Table.Cell width={1}>
                                {index + 1}
                            </Table.Cell>

                            <Table.Cell>{currItem.name}</Table.Cell>
                            {currItem.type === 1 && <Table.Cell>Company</Table.Cell>}
                            {currItem.type === 2 && <Table.Cell>Agency</Table.Cell>}
                            <Table.Cell>{currItem.email}</Table.Cell>
                            <Table.Cell>{currItem.address}</Table.Cell>
                            <Table.Cell>{currItem.phone}</Table.Cell>
                            {currItem.type === 1 && <Table.Cell> {currItem.company.name}</Table.Cell>}
                            {currItem.type === 1 && <Table.Cell> {currItem.company.email}</Table.Cell>}

                            {currItem.type === 2 && <Table.Cell> {currItem.agency.name}</Table.Cell>}
                            {currItem.type === 2 && <Table.Cell> {currItem.agency.email}</Table.Cell>}

                            <Table.Cell>
                                <Button color='green' onClick={() => verifyUser(currItem.id)}>Verify</Button>
                                <Button color='red' onClick={() => rejectUser(currItem.id)}>Reject</Button>
                            </Table.Cell>
                            
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}
export { TableUnverifiedUserList }
