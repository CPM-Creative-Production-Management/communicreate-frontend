import React, { useEffect, useState } from "react";
import SortableTable from "../SortableTable";
import { Button, Grid, Icon, Label, Message } from "semantic-ui-react";
import { Avatar, Chip, Stack } from "@mui/material";
import AddTaskModal from "../modals/AddTaskModal";
import TableEmpList from "../TableEmpList";
import EditTaskModal from "../modals/EditTaskModal";

import { useSelector, useDispatch } from "react-redux";
import { updateEstimation } from "../../actions";
import { showToast } from "../../App";

export const SingleTaskCard = (props) => {

    const [openEditTaskModal, setOpenEditTaskModal] = useState(false)
    const globalEstimation = useSelector(state => state.currEstimation)
    const dispatch = useDispatch()

    useEffect(() => {
        console.log('single task card', props)
    }, [props]);

    const editTask = () => {
        setOpenEditTaskModal(true)
        // props.set_is_adding_task(false)

    }

    const deleteTask = () => {
        console.log('deleting task', props.taskIndex)
        console.log('deleting task', globalEstimation.tasks[props.taskIndex])
        // update the globalEstimation via redux
        dispatch(updateEstimation({
            ...globalEstimation, tasks: globalEstimation.tasks.filter((task, index) => {
                if (index !== props.taskIndex) {
                    return task
                }
            })
        }))

        showToast('Task deleted successfully', 'success')
            

    }

        
        



    return (


        <div className=' mb-4'>

            <Grid className={'ms-0'} columns={2}>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <div className={'mb-2'}>
                            <h3>#{props.taskIndex + 1} {props.singleTask.name}</h3>
                        </div>

                        <div className={'mt-3 mb-2'}>
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

                        <Button onClick={deleteTask}>
                            <Icon name='trash alternate outline' /> Delete
                        </Button>
                    </Stack>


                </Grid.Row>


            </Grid>

            


            <TableEmpList tableData={props.singleTask.Employees} onAddTaskList={true} />

            <Message
                icon='money bill alternate outline'
                header={props.singleTask.cost + ' ৳'} 
                content='Estimated from the assigned Employees salary'
            />

            <EditTaskModal show={openEditTaskModal} editTaskIndex={props.taskIndex} singleTask={props.singleTask}
                setShow={setOpenEditTaskModal}/>

        </div>


    );

}