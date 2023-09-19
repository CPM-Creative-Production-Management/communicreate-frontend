import Modal from 'react-bootstrap/Modal';
import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { AddSingleTaskCard } from "../cards/AddSingleTaskCard";


import { useSelector, useDispatch } from "react-redux";
import { updateCurrTask, updateEstimation, resetCurrTask } from "../../actions";
import { showToast } from '../../App';
import { EditSingleTaskCard } from '../cards/EditSingleTaskCard';

const EditTaskModal = (props) => {

    // get the global Estimation from redux store
    const globalEstimation = useSelector(state => state.currEstimation)
    // const currTask = useSelector(state => state.currTask)
    const currTask = useSelector(state => state.currTask)
    // dispatch an action to the reducer
    const dispatch = useDispatch()

    // let [currTask, setCurrTask] = useState(
    //     {
    //         name: "",
    //         description: "",
    //         cost: 0,
    //         Employees: [],
    //         tags: [],
    //     });




    useEffect(() => {
        // get the current task from the global estimation using props.taskIndex
        // dispatch(updateCurrTask({  ...globalEstimation.tasks[props.taskIndex] }))
        console.log('currTask: ', currTask)
    }, [currTask])



    const editTask = () => {
        // console.log('editing task', currTask)
        // console.log('editing task index',  props.editTaskIndex)
        // console.log({
        //     ...globalEstimation, tasks: globalEstimation.tasks.map((task, index) => {
        //         if (index === props.editTaskIndex) {
        //             return currTask
        //         }
        //         return task
        //     })
        // })
        // update the global estimation with the edited task, make sure to replace the old task with the new one
        dispatch(updateEstimation({
            ...globalEstimation, tasks: globalEstimation.tasks?.map((task, index) => {
                if (index === props.editTaskIndex) {
                    return currTask
                }
                return task
            })
        }))

        dispatch(resetCurrTask())

        props.setShow(false)


    }


    const cancelTask = () => {
        dispatch(resetCurrTask())
        props.setShow(false)
        // props.set_is_adding_task(false)

    }


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Edit Task

                </Modal.Title>
            </Modal.Header>

            <EditSingleTaskCard singleTask={props.singleTask} editTaskIndex={props.editTaskIndex}/>


            <Modal.Footer className={'me-2'}>

                <Button.Group>
                    <Button onClick={() => {

                        cancelTask()
                    }}>Cancel</Button>
                    <Button.Or />
                    <Button onClick={() => {
                        editTask()

                    }} positive>Save</Button>
                </Button.Group>

            </Modal.Footer>
        </Modal>
    );
}

export default EditTaskModal