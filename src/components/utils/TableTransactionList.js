import React from 'react'
import { Table } from "semantic-ui-react";

const TableTransactionList = ({ tableData }) => {

    return (
        <div>
            <Table celled padded style={{ textAlign: 'center' }}>

                <thead>
                    <tr>
                        <th scope={"col"}>#</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Payment Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Status</th>
                        <th scope="col">Transaction ID</th>
                    </tr>
                </thead>

                <Table.Body>
                    {tableData.payment_history?.map((currItem, index) => (
                        <Table.Row key={currItem.id}>
                            <Table.Cell width={1}>
                                {index + 1}
                            </Table.Cell>
                            <Table.Cell>{currItem.amount} ৳</Table.Cell>
                            <Table.Cell>{currItem.payment_date}</Table.Cell>
                            <Table.Cell>{currItem.payment_time}</Table.Cell>
                            {currItem.status === "successful" && <Table.Cell style={{color:"green"}}><b>{currItem.status}</b></Table.Cell>}
                            {currItem.status === "failed" && <Table.Cell style={{color:"red"}}><b>{currItem.status}</b></Table.Cell>}
                            <Table.Cell>{currItem.transaction_id}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    )
}
export default TableTransactionList
