import React from "react";
import SortableTable from "../SortableTable";
import {Button, Grid, Icon, Label} from "semantic-ui-react";
import {Avatar, Chip} from "@mui/material";
import TaskModal from "../modals/TaskModal";

export const SingleTaskCard = (props) => {

    const tableData = [
        {name: 'John', age: 15, gender: 'Male'},
        {name: 'Amber', age: 40, gender: 'Female'},
        {name: 'Leslie', age: 25, gender: 'Other'},
        {name: 'Ben', age: 70, gender: 'Male'},
    ]


    return (


        <div className='ms-4 me-4 mb-4'>

            <Grid className={'ms-1'} columns={2}>
                <Grid.Row>
                    <Grid.Column width={14}>
                        <div>
                            <h3>#1 Task name</h3>
                        </div>


                        <Chip sx={{marginTop: '.5em', marginRight:'.5em'}} avatar={<Avatar>M</Avatar>} label="tag 1" variant="filled"/>
                        <Chip sx={{marginTop: '.5em', marginRight:'.5em'}} avatar={<Avatar>M</Avatar>} label="tag 2" variant="filled"/>


                    </Grid.Column>

                    {props.show === false?<Grid.Column width={2}>
                        <Button onClick={()=> {
                            props.setShow(true)
                            props.set_is_adding_task(false)
                        }} fluid>
                            <Icon name='edit'/> Edit
                        </Button></Grid.Column> : <Grid.Column width={2}/>}

                </Grid.Row>


            </Grid>

            {/*<TaskModal show={props.show}*/}
            {/*           setShow={props.setShow} is_adding_task={props.is_adding_task} set_is_adding_task = {props.set_is_adding_task}/>*/}


            <SortableTable tableData={tableData}/>


        </div>


    );

}