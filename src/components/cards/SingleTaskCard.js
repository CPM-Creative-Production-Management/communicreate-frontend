import React, { useEffect, useState } from "react";
import { Button, Grid, Icon, Label, Message, Dropdown } from "semantic-ui-react";
import { Stack } from "@mui/material";
import TableEmpList from "../utils/TableEmpList";
import EditTaskModal from "../modals/EditTaskModal";
import RequestApprovalModal from "../modals/RequestApprovalModal";

import { useSelector, useDispatch } from "react-redux";
import { updateEstimation } from "../../actions";
import { showToast } from "../../App";
import { base_url, base_s3_url } from "../..";
import { regularApiRequest } from "../api/regularApiRequest";

export const SingleTaskCard = (props) => {


    const [openEditTaskModal, setOpenEditTaskModal] = useState(false)
    const [openRequestApprovalModal, setOpenRequestApprovalModal] = useState(false)
    const [file, setFile] = useState(null)
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

        
    const sendApprovalRequest = async (id, sample_link) => {
        // console.log(id)
        const reqBody = {
            sample_link: sample_link,
        }
        const response = await regularApiRequest({
            url: `${base_url}estimation/task/request/${id}`,
            method: 'PUT',
            reqBody: reqBody
        })
        if (response.status === 200) {
            showToast('Approval request sent', 'success')
            dispatch(updateEstimation({
                ...globalEstimation, tasks: globalEstimation.tasks?.map((task, index) => {
                    if (task.id === id) {
                        return {
                            ...task, status: 1
                        }
                    } else {
                        return task
                    }
                })
            }))
        } else {
            showToast('Approval request failed', 'error')
        }
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
                        }} disabled={props.finished} >
                            <Icon name='edit' /> Edit
                        </Button>

                        <Button onClick={deleteTask} disabled={props.finished}>
                            <Icon name='trash alternate outline' /> Delete
                        </Button>

                        {props.edit && props.finalized && !props.finished && (props.singleTask.status === 0 ? <Button onClick={() => 
                            // sendApprovalRequest(props.singleTask.id)
                            setOpenRequestApprovalModal(true)
                        }>
                            <Icon name='send' /> Request Approval
                        </Button> : props.singleTask.status === 1 ? <Button disabled> Awaiting Approval </Button> : (props.singleTask.status === 2 && <Button disabled> Approved </Button>))}


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
            
            <RequestApprovalModal show={openRequestApprovalModal} setShow={setOpenRequestApprovalModal} singleTask={props.singleTask} sendApprovalRequest={sendApprovalRequest} setFile={setFile}/>

        </div>


    );

}