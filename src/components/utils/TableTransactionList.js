import React, { useEffect } from 'react'
import {Button, Header, Image, Table} from "semantic-ui-react";
import { useState } from 'react';
import {useSelector, useDispatch} from "react-redux";

const TableTransactionList = ({tableData, isDisplaying}) => {

    const dispatch = useDispatch()

    return (
        <div>
            <Table celled padded>

            <thead>
            <tr>
                <th scope={"col"}>#</th>
                <th scope="col">Amount</th>
                <th scope="col">Payment Date</th>
            </tr>
            </thead>

            <Table.Body>
                {tableData?.map((currItem, index) => (
                    <Table.Row key={currItem.id}>
                        <Table.Cell width={1}>
                            #{index + 1}
                        </Table.Cell>
                        <Table.Cell>{currItem.amount}</Table.Cell>
                        <Table.Cell singleLine width={3}>{currItem.payment_date} ৳</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            </Table>
</div>
    )
}
export default TableTransactionList
