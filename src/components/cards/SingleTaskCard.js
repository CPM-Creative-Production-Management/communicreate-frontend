import React, {useEffect} from "react";
import SortableTable from "../SortableTable";
import {Button, Grid, Icon, Label} from "semantic-ui-react";
import {Avatar, Chip, Stack} from "@mui/material";
import AddTaskModal from "../modals/AddTaskModal";
import TableEmpList from "../TableEmpList";

export const SingleTaskCard = (props) => {

    useEffect(() => {
        console.log('single task card', props)
    }, [props]);


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

                    {props.show === false ? <Grid.Column width={4}>
                        <Stack direction="row" spacing={1}>
                            {/*<Button onClick={() => {*/}
                            {/*    props.setShow(true)*/}
                            {/*    props.set_is_adding_task(false)*/}
                            {/*}} fluid>*/}
                            {/*    <Icon name='edit'/> Edit*/}
                            {/*</Button>*/}
                            {/* todo: we have the index, we can edit dont worry*/}

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