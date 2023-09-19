import React from 'react'
import { Button, Table } from "semantic-ui-react";
import { base_url } from '../../index';
import { regularApiRequest } from "../api/regularApiRequest";
import { showToast } from "../../App";

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
        console.log('response', response)

        if (response.status === 200) {
            showToast("User verified!", { toastType: 'success' })
            window.location.reload()
        } else {
            showToast("User couldn't be verified!", { toastType: 'error' })
        }
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
        if (response.status === 200) {
            showToast("User rejected!", { toastType: 'success' })
            window.location.reload()
        } else {
            showToast("User couldn't be rejected!", { toastType: 'error' })
        }
    }

    return (
        <div>

            <Table celled padded className='mt-3' style={{ textAlign: 'center' }}>

                <thead>
                    <tr>
                        <th scope={"col"} width="1%">#</th>
                        <th scope="col" width="15%">Name</th>
                        <th scope="col" width="10%">Email</th>
                        <th scope="col" width="19%">Address</th>
                        <th scope="col" width="10%">Phone</th>
                        <th scope="col" width="10%">Association</th>
                        <th scope="col" width="10%">Association Email</th>
                        <th scope="col" width="25%">Action</th>
                    </tr>
                </thead>

                <Table.Body>
                    {tableData?.map((currItem, index) => (
                        <Table.Row key={currItem.id}>
                            <Table.Cell width={1}>
                                {index + 1}
                            </Table.Cell>
                            <Table.Cell>{currItem.name}</Table.Cell>
                            <Table.Cell>{currItem.email}</Table.Cell>
                            <Table.Cell>{currItem.address}</Table.Cell>
                            <Table.Cell>{currItem.phone}</Table.Cell>
                            {currItem.type === 1 && <Table.Cell><b>Company:</b> {currItem.company.name}</Table.Cell>}
                            {currItem.type === 1 && <Table.Cell>{currItem.company.email}</Table.Cell>}

                            {currItem.type === 2 && <Table.Cell><b>Agency:</b> {currItem.agency.name}</Table.Cell>}
                            {currItem.type === 2 && <Table.Cell>{currItem.agency.email}</Table.Cell>}

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
