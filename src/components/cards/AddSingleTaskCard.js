import React, { useEffect, useState } from "react";
import { Button, Dropdown, Form, Grid, Icon, Input, Label, Message } from "semantic-ui-react";
import { Autocomplete, Avatar, Chip, CircularProgress, Stack, TextField } from "@mui/material";
import AddTaskModal from "../modals/AddTaskModal";
import { showToast } from "../../App";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useApiRequest } from "../api/useApiRequest";
import { base_url } from "../../index";
import { AiOutlineFileSearch } from "react-icons/ai";
import TableEmpList from "../utils/TableEmpList";

import { useSelector, useDispatch } from "react-redux";
import { updateCurrTask, updateEstimation } from "../../actions";


export const AddSingleTaskCard = () => {


    const globalEstimation = useSelector(state => state.currEstimation)
    const globalRequest = useSelector(state => state.currRequest)


    const currTask = useSelector(state => state.currTask)
    // dispatch an action to the reducer
    const dispatch = useDispatch()


    const handleUpdateCurrTask = (event) => {
        dispatch(updateCurrTask({
            ...currTask, [event.target.name]: event.target.value
        }))

        console.log('curr task', currTask)
    }

    let { data: allTaskTags, dataLoading: tagDataLoading, error: tagError } = useApiRequest({
        url: base_url + 'tasktag',
        method: 'GET',
    });
    allTaskTags = allTaskTags?.name

    useEffect(() => {

        console.log('selected tags', currTask.tags)
        // showToast(allTags, {toastType: 'success'})

    }, [currTask.tags]);

    const handleDeleteTag = (index) => {
        console.log('delete tag', index)
        // showToast(index, {toastType: 'success'})
        dispatch(updateCurrTask({ ...currTask, tags: currTask.tags.filter((tag, i) => i !== index) }))


        // setCurrTask({...currTask, tags: currTask.tags.filter((tag, i) => i !== index)})
    }

    const addTag = (tag_id) => {
        console.log('add tag', tag_id)
        // showToast(tag_id, {toastType: 'success'})
        // do not add if the item already exists
        if (currTask.tags.includes(allTaskTags[tag_id])) {
            showToast('Tag already added', 'error')

        } else {
            dispatch(updateCurrTask({ ...currTask, tags: [...currTask.tags, allTaskTags[tag_id]] }))
            // setCurrTask({...currTask, tags: [...currTask.tags, allTaskTags[tag_id]]})
        }
    }

    const { data: employeeList, dataLoading, error } = useApiRequest({
        url: base_url + 'employees',
        method: 'GET',
    })


    const addEmpToTask = (empId) => {
        // need to search the entire array to find the employee
        let emp = employeeList.find((emp) => emp.value === empId)
        console.log('add employee:', emp)
        // do not add if the item already exists
        if (currTask.Employees.includes(emp)) {
            showToast('Employee already exists', 'error')

        } else {
            dispatch(updateCurrTask({ ...currTask, Employees: [...currTask.Employees, emp] }))
        }
    }

    useEffect(() => {
        console.log('curr task:', currTask)
    }, [currTask]);

    useEffect(() => {
        console.log('selected emp:', currTask.Employees)
        calculateTaskCost()
    }, [currTask.Employees]);

    const calculateTaskCost = () => {
        let totalCost = 0
        currTask.Employees?.map((currEmp) => {
      
            let deadline = new Date(globalRequest.comp_deadline)
            let currDate = new Date(globalRequest.res_deadline)
            let diffTime = Math.abs(deadline - currDate);
            let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            let diffMonths = Math.ceil(diffDays / 30);

            console.log('diff months', diffMonths)

            totalCost += currEmp.salary * diffMonths
        })

        dispatch(updateCurrTask({ ...currTask, cost: totalCost }))


    }


    return (
        <div className='ms-4 me-4 mb-4'>
            <br />
            <div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input onChange={handleUpdateCurrTask} fluid placeholder='Task Name' name='name'
                            value={currTask.name} />
                    </Form.Group>
                </Form>
            </div>


            <div className={'mb-3'}>

                <Stack direction="row" spacing={1}>

                    {currTask.tags?.map((currTag, index) => (
                        <Chip key={currTag.id} label={currTag.name} onDelete={() => {
                            handleDeleteTag(index)
                        }} />
                    ))}

                </Stack>
            </div>


            <Dropdown icon='filter'
                floating
                labeled
                button
                className='icon' text='Add tag'>
                <Dropdown.Menu>

                    {allTaskTags?.map((currTag, index) => (
                        <Dropdown.Item onClick={() => {
                            addTag(index)
                        }} key={currTag.id} icon='tag' text={currTag.name} />
                    ))}


                </Dropdown.Menu>
            </Dropdown>




            <TableEmpList tableData={currTask.Employees} onAddTaskModal={true} />

            <Dropdown
                className='mt-3'
                placeholder='Search Employee...'
                fluid
                search
                selection
                onChange={(e, data) => {
                    console.log('selected', data.value)
                    addEmpToTask(data.value)

                }}
                options={employeeList}
            />


            <Message
                icon='money bill alternate outline'
                header={currTask.cost + ' ৳'}
                content='Estimated from the assigned Employees salary'
            />


        </div>


    )


}