import React, { useEffect } from 'react'
import {Button, Header, Image, Table} from "semantic-ui-react";

import {useSelector, useDispatch} from "react-redux";
import {updateCurrTask} from "../actions";

const TableEmpList = ({tableData, isDisplaying}) => {

    const currTask = useSelector(state => state.currTask)
    const dispatch = useDispatch()

    const removeEmployeeFromTask = (index) => {
        console.log('need to delete: ', index)
        console.log('#######'); dispatch(updateCurrTask({ 
            ...currTask, Employees: currTask.Employees.filter((emp, i) => i !== index)
        }))


    }

    // useEffect(() => {
    //     console.log('currTask: ', tableData)
    // }, [tableData])

    return (

        <Table celled padded>

            <thead>
            <tr>
                {isDisplaying? null:
                <th scope="col"></th>}
                <th scope={"col"}>#</th>
                <th scope="col">Employee</th>
                <th scope="col">Rating</th>
                <th scope="col">Salary</th>
            </tr>
            </thead>

            <Table.Body>
                {tableData?.map((currItem, index) => (
                    <Table.Row key={currItem.id}>

                        {isDisplaying? null:
                        <Table.Cell width={1}>
                            <Button onClick={() => {
                                removeEmployeeFromTask(index)
                            }} size={"tiny"} circular icon='close'/>

                        </Table.Cell>
                        }

                        <Table.Cell width={1}>
                            #{index + 1}

                        </Table.Cell>


                        <Table.Cell>
                            <Header as='h4' image>
                                <Image src={currItem.image? currItem.image : 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'} size='mini'
                                       circular/><Header.Content>
                                {currItem.name}

                            </Header.Content>
                            </Header>
                        </Table.Cell>

                        <Table.Cell singleLine width={3}>{currItem.rating}</Table.Cell>
                        <Table.Cell singleLine width={3}>{currItem.salary} ৳</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>

        </Table>
    )
}
export default TableEmpList
