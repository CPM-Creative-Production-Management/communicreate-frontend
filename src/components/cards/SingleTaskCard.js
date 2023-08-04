import React, {useEffect} from "react";
import SortableTable from "../SortableTable";
import {Button, Grid, Icon, Label} from "semantic-ui-react";
import {Avatar, Chip, Stack} from "@mui/material";
import TaskModal from "../modals/TaskModal";
import TableEmpList from "../TableEmpList";

export const SingleTaskCard = (props) => {

    const tableData = [
        {name: 'John', age: 15, gender: 'Male'},
        {name: 'Amber', age: 40, gender: 'Female'},
        {name: 'Leslie', age: 25, gender: 'Other'},
        {name: 'Ben', age: 70, gender: 'Male'},
    ]

    useEffect(() => {
        console.log('single task card', props)
    }, []);


    return (


        <div className='ms-4 me-4 mb-4'>

            <Grid className={'ms-1'} columns={2}>
                <Grid.Row>
                    <Grid.Column width={12}>
                        <div className={'mb-2'}>
                            <h3>#{props.taskIndex} {props.singleTask.name}</h3>
                        </div>


                        <Chip sx={{marginTop: '.5em', marginRight: '.5em'}} avatar={<Avatar>M</Avatar>} label="tag 1"
                              variant="filled"/>
                        <Chip sx={{marginTop: '.5em', marginRight: '.5em'}} avatar={<Avatar>M</Avatar>} label="tag 2"
                              variant="filled"/>


                    </Grid.Column>

                    {props.show === false ? <Grid.Column width={4}>
                        <Stack direction="row" spacing={1}>
                            <Button onClick={() => {
                                props.setShow(true)
                                props.set_is_adding_task(false)
                            }} fluid>
                                <Icon name='edit'/> Edit
                            </Button>
                            <Button onClick={() => {
                            }} fluid>
                                <Icon name='delete'/> Delete
                            </Button>
                        </Stack>
                    </Grid.Column> : <Grid.Column width={2}/>}

                </Grid.Row>


            </Grid>


            <TableEmpList tableData={props.singleTask.Employees} isDisplaying={true}/>


        </div>


    );

}