import React, { useEffect, useState } from "react";
import SortableTable from "../SortableTable";
import { Button, Grid, Icon, Label } from "semantic-ui-react";
import { Avatar, Chip, Stack } from "@mui/material";
import AddTaskModal from "../modals/AddTaskModal";
import TableEmpList from "../TableEmpList";
import EditTaskModal from "../modals/EditTaskModal";

export const SingleTaskCard = (props) => {

    const [openEditTaskModal, setOpenEditTaskModal] = useState(false)

    useEffect(() => {
        console.log('single task card', props)
    }, [props]);

    const editTask = () => {
        setOpenEditTaskModal(true)
        // props.set_is_adding_task(false)

    }


    return (


        <div className='ms-4 me-4 mb-4'>

            <Grid className={'ms-0'} columns={2}>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <div className={'mb-2'}>
                            <h3>#{props.taskIndex} {props.singleTask.name}</h3>
                        </div>

                        <div className={'mt-3'}>
                            <Stack direction="row" >
                                {props.singleTask.tags?.map((currTag, index) => (
                                    <Label className={'me-2'}>
                                        <Icon name='tag' /> {currTag.name}
                                    </Label>
                                ))}
                            </Stack>
                        </div>


                    </Grid.Column>


                    <Stack direction="row" spacing={2}>
                        <Button onClick={() => {
                            editTask()
                        }} >
                            <Icon name='edit' /> Edit
                        </Button>

                        <Button onClick={() => {
                        }} >
                            <Icon name='trash alternate outline' /> Delete
                        </Button>
                    </Stack>


                </Grid.Row>


            </Grid>


            <TableEmpList tableData={props.singleTask.Employees} isDisplaying={true} />

            <EditTaskModal show={openEditTaskModal} editTaskIndex={props.taskIndex} singleTask={props.singleTask}
                setShow={setOpenEditTaskModal}/>

        </div>


    );

}