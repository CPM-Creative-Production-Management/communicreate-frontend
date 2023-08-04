import React, {useEffect, useState} from 'react';
import ResponsiveNavbar from "../ResponsiveNavbar";
import {CollapsibleSidebar} from "../CollapsibleSidebar";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "../fragments/Dashboard";
import {Archive} from "../fragments/Archive";
import {Card, Grid, Input, Label, Segment, Form, Button, Icon, Divider, Message} from "semantic-ui-react";
import TaskModal from "../modals/TaskModal";
import {AddTask} from "@mui/icons-material";
import SortableTable from "../SortableTable";
import {SingleTaskCard} from "../cards/SingleTaskCard";
import {Avatar, Chip} from "@mui/material";

import {useSelector, useDispatch} from "react-redux";
import {decrement, increment} from "../../actions";
import {updateEstimation} from "../../actions";
import {Textarea} from "@nextui-org/react";

export const AddEstimationPage = () => {

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

    return (
        <div>
            <br/>

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
                                                    value={globalEstimation.title} fluid placeholder='Title'/>
                                        <Form.Input name='company' onChange={handleUpdateEstimation}
                                                    value={globalEstimation.company} fluid placeholder='Company'/>
                                    </Form.Group>
                                </Form>

                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Label fluid size={"large"} content={globalEstimation.deadline}
                                       icon='clock outline'/>
                            </Grid.Column>

                            <Grid.Column width={4}>
                                images
                            </Grid.Column>

                        </Grid.Row>

                    </Grid>

                    <Message className='ms-1 me-1'
                             icon='hand point right outline'
                             header='Description'
                             content={globalEstimation.description}
                    />


                </Card.Content>

                <Divider/>

                {globalEstimation.tasks ?
                    globalEstimation.tasks.map((task, index) => {
                        return (<div>
                                <SingleTaskCard show={openAddTaskModal} singleTask={task} taskIndex={index + 1}
                                                setShow={setOpenAddTaskModal} is_adding_task={isAddingTask}
                                                set_is_adding_task={setIsAddingTask}/>
                                {index < globalEstimation.tasks.length - 1 ? <Divider/> : null}

                            </div>
                        )
                    })
                    : <div className='text-center'><h4>No tasks added yet </h4> <br/></div>}


            </Card>

            <Button onClick={() => {
                setOpenAddTaskModal(true)
                setIsAddingTask(true)
            }} positive animated>
                <Button.Content visible>Add task</Button.Content>
                <Button.Content hidden>
                    <Icon name='add'/>
                </Button.Content>
            </Button>

            <Button animated>
                <Button.Content visible>Save</Button.Content>
                <Button.Content hidden>
                    <Icon name='save'/>
                </Button.Content>
            </Button>

            <br/><br/>

            <TaskModal show={openAddTaskModal}
                       setShow={setOpenAddTaskModal} is_adding_task={isAddingTask} set_is_adding_task={setIsAddingTask}
            />

        </div>
    );
}