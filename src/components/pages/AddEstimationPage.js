import React, { useEffect, useState } from 'react';
import ResponsiveNavbar from "../ResponsiveNavbar";
import { SidebarPro } from "../SidebarPro";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../fragments/Dashboard";
import { Archive } from "../fragments/Archive";
import { Card, Grid, Input, Label, Segment, Form, Button, Icon, Divider, Message } from "semantic-ui-react";
import AddTaskModal from "../modals/AddTaskModal";
import { AddTask } from "@mui/icons-material";
import SortableTable from "../SortableTable";
import { SingleTaskCard } from "../cards/SingleTaskCard";
import { Avatar, Chip, Stack } from "@mui/material";
import { Dropdown } from "semantic-ui-react";

import { useSelector, useDispatch } from "react-redux";
import { updateEstimation, resetCurrEstimation } from "../../actions";
import { Textarea } from "@nextui-org/react";
import { showToast } from "../../App";


import { useNavigate } from "react-router-dom";
import { useApiRequest } from '../api/useApiRequest';
import { base_url } from '../..';


export const AddEstimationPage = () => {
    // todo: only process the global estimation object when the user clicks save
    //  and then send it to the backend

    const navigate = useNavigate()

    // get the global Estimation from redux store
    const globalEstimation = useSelector(state => state.currEstimation)
    // dispatch an action to the reducer
    const dispatch = useDispatch()

    const handleUpdateEstimation = (event) => {
        dispatch(updateEstimation({
            ...globalEstimation, [event.target.name]: event.target.value
        }))
        console.log('updated estimation', globalEstimation)
    }

    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)
    const [isAddingTask, setIsAddingTask] = useState(false)

    const sendEstimation = () => {
        console.log('sending estimation to backend', globalEstimation)

        // reset the global estimation
        dispatch(resetCurrEstimation())


        showToast('Estimation sent successfully', 'success')
        navigate('/dashboard')

    }

    let { data: allEstimationTags, dataLoading: tagDataLoading, error: tagError } = useApiRequest({
        url: base_url + 'tag',
        method: 'GET',
    });
    allEstimationTags = allEstimationTags?.tags

    useEffect(() => {

        console.log('all tags', allEstimationTags)

    }, [allEstimationTags]);

    const handleDeleteTag = (index) => {
        console.log('delete tag', index)
        // showToast(index, {toastType: 'success'})

        dispatch(updateEstimation({ ...globalEstimation, tags: globalEstimation.tags.filter((tag, i) => i !== index) }))

    }

    const addTag = (tag_id) => {
        console.log('add tag', tag_id)
        // showToast(tag_id, {toastType: 'success'})
        // do not add if the item already exists
        if (globalEstimation.tags.includes(allEstimationTags[tag_id])) {
            showToast('Tag already added', 'error')

        } else {
            dispatch(updateEstimation({ ...globalEstimation, tags: [...globalEstimation.tags, allEstimationTags[tag_id]] }))
        }
    }

    useEffect(() => {
        // update the globalEstimation cost via redux by looping over all tasks
        let totalEstimationCost = 0
        globalEstimation.tasks?.map((currTask) => {
            totalEstimationCost += currTask.cost
        })
        dispatch(updateEstimation({
            ...globalEstimation, cost: totalEstimationCost
        }))
    }, [globalEstimation.tasks]);


    return (
        <div>
            <br />

            <h1>{globalEstimation.title}</h1>

            <Card className='p-4' fluid>
                <Card.Meta >
                    <h3>Project Overview</h3>
                </Card.Meta>

                <div className={'mb-2 mt-4'}>

                    <Stack direction="row" spacing={1}>

                        {globalEstimation.tags?.map((currTag, index) => (
                            <Chip key={currTag.id} label={currTag.tag} onDelete={() => {
                                handleDeleteTag(index)
                            }} />
                        ))}

                    </Stack>
                </div>

                <div className='md-2 xs-2 mb-3'>

                    <Dropdown icon='filter'
                        floating
                        labeled
                        button

                        className='icon' text='Add tag'>
                        <Dropdown.Menu>

                            {allEstimationTags?.map((currTag, index) => (
                                <Dropdown.Item onClick={() => {
                                    addTag(index)
                                }} key={currTag.id} icon='tag' text={currTag.tag} />
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input name='title' onChange={handleUpdateEstimation}
                            value={globalEstimation.title} fluid placeholder='Title' />
                        <Form.Input name='company' onChange={handleUpdateEstimation}
                            value={globalEstimation.company} fluid placeholder='Company' />
                        <Form.Input name='deadline' onChange={handleUpdateEstimation}
                            value={globalEstimation.deadline} fluid placeholder='Deadline' />
                    </Form.Group>
                </Form>


                <Message
                    icon='hand point right outline'
                    header='Description'
                    content={globalEstimation.description} />

                <Message
                    icon='money bill alternate outline'
                    header={globalEstimation.cost + ' ৳'}
                    content='Total Estimated cost of the project'
                />



                <Divider />

                {globalEstimation.tasks.length > 0 ?
                    globalEstimation.tasks?.map((task, index) => {
                        return (<div>
                            <SingleTaskCard show={openAddTaskModal} singleTask={task} taskIndex={index}
                                setShow={setOpenAddTaskModal} />
                            {index < globalEstimation.tasks.length - 1 ? <Divider /> : null}

                        </div>
                        )
                    })
                    : <div className='text-center'><h4>No tasks added yet </h4> <br /></div>}


            </Card>

            <Button onClick={() => {
                setOpenAddTaskModal(true)
                setIsAddingTask(true)
            }} animated>
                <Button.Content visible>Add task</Button.Content>
                <Button.Content hidden>
                    <Icon name='add' />
                </Button.Content>
            </Button>

            {/* <Button animated>
                <Button.Content visible>Save</Button.Content>
                <Button.Content hidden>
                    <Icon name='save' />
                </Button.Content>
            </Button> */}

            <Button onClick={sendEstimation} positive animated>
                <Button.Content visible>Send Estimation</Button.Content>
                <Button.Content hidden>
                    <Icon name='send' />
                </Button.Content>
            </Button>



            <br /><br />

            <AddTaskModal show={openAddTaskModal}
                setShow={setOpenAddTaskModal}
            />

        </div>
    );
}