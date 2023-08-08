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
import { Avatar, Chip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { updateEstimation } from "../../actions";
import { Textarea } from "@nextui-org/react";
import { showToast } from "../../App";

import { useNavigate } from "react-router-dom";


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

    const resetCurrEstimation = () => {
        dispatch(updateEstimation({
            title: "",
            company: "",
            deadline: "",
            description: "",
            tasks: [],
        }));
    }

    useEffect(() => {
        resetCurrEstimation()
    }, [])

    const sendEstimation = () => {
        console.log('sending estimation to backend', globalEstimation)

        // reset the global estimation
        resetCurrEstimation()


        showToast('Estimation sent successfully', 'success')
        navigate('/dashboard')

    }

    const finalizeEstimation = () => {
        navigate('/payment')
    }


    return (
        <div>
            <br />

            <h1>{globalEstimation.title}</h1>

            <Card fluid>
                <Card.Meta className='m-3'>
                    <h3>Project Overview</h3>
                </Card.Meta>

                <Card.Content>
                    <Grid className='ms-1' columns={3}>
                        <Grid.Row>
                            <Grid.Column width={9}>
                                <Form>
                                    <Form.Group widths='equal'>
                                        <Form.Input name='title' onChange={handleUpdateEstimation}
                                            value={globalEstimation.title} fluid placeholder='Title' />
                                        <Form.Input name='company' onChange={handleUpdateEstimation}
                                            value={globalEstimation.company} fluid placeholder='Company' />
                                    </Form.Group>
                                </Form>

                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Label fluid size={"large"} content={globalEstimation.deadline}
                                    icon='clock outline' />
                            </Grid.Column>

                            <Grid.Column width={4}>
                                images
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>

                    <Message className='ms-1 me-3'
                        icon='hand point right outline'
                        header='Description'
                        content={globalEstimation.description} />


                </Card.Content>

                <Divider />

                {globalEstimation.tasks ?
                    globalEstimation.tasks?.map((task, index) => {
                        return (<div>
                            <SingleTaskCard show={openAddTaskModal} singleTask={task} taskIndex={index}
                                setShow={setOpenAddTaskModal}/>
                            {index < globalEstimation.tasks.length - 1 ? <Divider /> : null}

                        </div>
                        )
                    })
                    :<div className='text-center'><h4>No tasks added yet </h4> <br /></div>}


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