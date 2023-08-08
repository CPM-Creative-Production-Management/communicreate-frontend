import React, { useEffect } from 'react'
import {Button, Header, Image, Table} from "semantic-ui-react";
import { Rating } from 'react-simple-star-rating'
import { useState } from 'react';
import EditEmployeeModal from './modals/EditEmployeeModal';
import EditButton from './custom/EditButton';

import {useSelector, useDispatch} from "react-redux";
import {updateCurrTask} from "../actions";

const TableEmpList = ({tableData, isDisplaying}) => {

    const handleEdit = (index) => {
        console.log(index)
    }

    const currTask = useSelector(state => state.currTask)
    const dispatch = useDispatch()

    const removeEmployeeFromTask = (index) => {
        console.log('need to delete: ', index)
        console.log('#######'); dispatch(updateCurrTask({ 
            ...currTask, Employees: currTask.Employees.filter((emp, i) => i !== index)
        }))
    }

    const [editEmployeeModal, setEditEmployeeModal] = useState(false)
    const [editData, setEditData] = useState({})

    // useEffect(() => {
    //     console.log('currTask: ', tableData)
    // }, [tableData])

    return (
        <div>
            <Table celled padded>

            <thead>
            <tr>
                {isDisplaying? null:
                <th scope="col"></th>}
                <th scope={"col"}>#</th>
                <th scope="col">Employee</th>
                <th scope="col">Rating</th>
                <th scope="col">Salary</th>
                <th scope="col">Address</th>
                <th scope="col">Action</th>
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
                              
                                <Image src={currItem.profile_picture? currItem.profile_picture : 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'} size='mini'
                                       circular/><Header.Content>
                                {currItem.name}

                            </Header.Content>
                            </Header>
                        </Table.Cell>

                        <Table.Cell singleLine width={3}><Rating initialValue={currItem.rating} readonly allowFraction size={25}/></Table.Cell>
                        <Table.Cell singleLine width={3}>{currItem.salary} ৳</Table.Cell>
                        <Table.Cell singleLine width={3}>{currItem.address}</Table.Cell>
                        <Table.Cell singleLine width={3}><center><EditButton 
                        data={editData} 
                        setEditData={setEditData}
                        name={currItem.name} 
                        id={currItem.id} 
                        salary={currItem.salary}
                        address={currItem.address}
                        onClick={() => setEditEmployeeModal(true)}
                        /></center></Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
            </Table>

            <EditEmployeeModal show={editEmployeeModal} setShow={setEditEmployeeModal} editData={editData} setEditData={setEditData}/>
        </div>
    )
}
export default TableEmpList
