import Modal from 'react-bootstrap/Modal';
import React, {useEffect, useState} from "react";
import {Button} from "semantic-ui-react";
import {SingleTaskCard} from "../cards/SingleTaskCard";
import {AddSingleTaskCard} from "../cards/AddSingleTaskCard";


import {useSelector, useDispatch} from "react-redux";
import {updateCurrTask, updateEstimation} from "../../actions";

const AddTaskModal = (props) => {

    // get the global Estimation from redux store
    const globalEstimation = useSelector(state => state.currEstimation)
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
        resetCurrTask()

    },[])

    const resetCurrTask = () => {
        dispatch(updateCurrTask({
            name: "",
            description: "",
            cost: 0,
            Employees: [],
            tags: [],
        }))
    }


    const addTask = () => {
        console.log('adding task', currTask)
        dispatch(updateEstimation({
            ...globalEstimation, tasks: [...globalEstimation.tasks, currTask]
        }))
        console.log('updated estimation', globalEstimation)
        // set the global redux currtask to empty
        resetCurrTask()

    }


    const cancelTask = () => {
        resetCurrTask()

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
                    {props.is_adding_task ? "Add a new Task" : "Edit Task"}

                </Modal.Title>
            </Modal.Header>

            <AddSingleTaskCard /> :


            <Modal.Footer className={'me-2'}>

                <Button.Group>
                    <Button onClick={() => {
                        props.setShow(false)
                        props.set_is_adding_task(false)
                        cancelTask()
                    }}>Cancel</Button>
                    <Button.Or/>
                    <Button onClick={() => {
                        props.setShow(false)
                        props.set_is_adding_task(false)
                        addTask()

                    }} positive>Save</Button>
                </Button.Group>

            </Modal.Footer>
        </Modal>
    );
}

export default AddTaskModal