import Modal from 'react-bootstrap/Modal';
import React, {useEffect} from "react";
import {Button} from "semantic-ui-react";
import {SingleTaskCard} from "../cards/SingleTaskCard";
import {AddSingleTaskCard} from "../cards/AddSingleTaskCard";

const TaskModal = (props) => {
    // used for both editing and adding new task


    useEffect(() => {
        console.log(props.is_adding_task)
    }, [])


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

            {props.is_adding_task ? <AddSingleTaskCard show={props.show}
                                                       setShow={props.setShow} is_adding_task={props.is_adding_task}
                                                       set_is_adding_task={props.set_is_adding_task}/> :
                <SingleTaskCard show={props.show}
                                setShow={props.setShow} is_adding_task={props.is_adding_task}
                                set_is_adding_task={props.set_is_adding_task}/>}


            <Modal.Footer className={'me-2'}>

                <Button.Group>
                    <Button onClick={() => {
                        props.setShow(false)
                        props.set_is_adding_task(false)
                    }}>Cancel</Button>
                    <Button.Or/>
                    <Button onClick={() => {
                        props.setShow(false)
                        props.set_is_adding_task(false)

                    }} positive>Save</Button>
                </Button.Group>

            </Modal.Footer>
        </Modal>
    );
}

export default TaskModal