import React, {useEffect} from 'react';
import ResponsiveNavbar from "../ResponsiveNavbar";
import {CollapsibleSidebar} from "../CollapsibleSidebar";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "../fragments/Dashboard";
import {Archive} from "../fragments/Archive";
import {Card, Grid, Input, Label, Segment, Form, Button, Icon, Divider} from "semantic-ui-react";
import TaskModal from "../modals/TaskModal";
import {AddTask} from "@mui/icons-material";
import SortableTable from "../SortableTable";
import {SingleTaskCard} from "../cards/SingleTaskCard";
import {Avatar, Chip} from "@mui/material";



export const AddEstimationPage = () => {




    const [openAddTaskModal, setOpenAddTaskModal] = React.useState(false)
    const [isAddingTask, setIsAddingTask] = React.useState(false)

    return (
        <div>
            <br/>

            <h1>Title </h1>

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
                                        <Form.Input fluid placeholder='Title'/>
                                        <Form.Input fluid placeholder='Company'/>
                                    </Form.Group>
                                </Form>

                            </Grid.Column>

                            <Grid.Column width={3}>
                                <Label className={'p-2'} fluid size={"large"} content='3 months' icon='clock outline'/>


                            </Grid.Column>

                            <Grid.Column width={4}>
                                images
                            </Grid.Column>

                        </Grid.Row>
                    </Grid>

                </Card.Content>


            <Divider/>
            <SingleTaskCard show={openAddTaskModal}
                            setShow={setOpenAddTaskModal} is_adding_task={isAddingTask} set_is_adding_task = {setIsAddingTask}/>

            </Card>

            <Button onClick={()=> {
                setOpenAddTaskModal(true)
                setIsAddingTask(true)
            }} positive animated>
                <Button.Content visible>Add task</Button.Content>
                <Button.Content hidden>
                    <Icon name='add' />
                </Button.Content>
            </Button>

            <Button animated>
                <Button.Content visible>Save</Button.Content>
                <Button.Content hidden>
                    <Icon name='save' />
                </Button.Content>
            </Button>

            <TaskModal show={openAddTaskModal}
                       setShow={setOpenAddTaskModal} is_adding_task={isAddingTask} set_is_adding_task = {setIsAddingTask}/>

        </div>
    );
}