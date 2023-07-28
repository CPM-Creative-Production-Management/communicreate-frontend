import React, {useEffect} from "react";
import SortableTable from "../SortableTable";
import {Button, Dropdown, Form, Grid, Icon, Label} from "semantic-ui-react";
import {Avatar, Chip, Stack} from "@mui/material";
import TaskModal from "../modals/TaskModal";
import {showToast} from "../../App";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

export const AddSingleTaskCard = (props) => {

    const tableData = [
        {name: 'John', age: 15, gender: 'Male'},
        {name: 'Amber', age: 40, gender: 'Female'},

    ]

    const allTags = [
        {id: 1, name: 'video editing'},
        {id: 2, name: 'graphic design'},
        {id: 3, name: 'UI/UX'},
        {id: 4, name: 'Summer'},
    ]

    const [allTaskTags, setAllTaskTags] = React.useState([])
    const [selectedTaskTags, setSelectedAllTaskTags] = React.useState([])

    useEffect(() => {
        // load all the task tags once
        setAllTaskTags(allTags)
        console.log('all tags', allTaskTags)

    }, [])

    useEffect(() => {

        console.log('selected tags', selectedTaskTags)
        // showToast(allTags, {toastType: 'success'})

    }, [selectedTaskTags]);

    const handleDelete = (index) => {
        console.log('delete tag', index)
        // showToast(index, {toastType: 'success'})
        setSelectedAllTaskTags(selectedTaskTags.filter((currTag, currIndex) => {
            return currIndex !== index
        }))
    }

    const addTag = (tag_id) => {
        console.log('add tag', tag_id)
        // showToast(tag_id, {toastType: 'success'})
        // do not add if the item already exists
        if (selectedTaskTags.includes(allTaskTags[tag_id])) {
            showToast('Tag already exists', {toastType: 'error'})

        } else {
            setSelectedAllTaskTags([...selectedTaskTags, allTaskTags[tag_id]])
        }
    }


    return (


        <div className='ms-4 me-4 mb-4'>
            <br/>


            <div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input fluid placeholder='Task Name'/>
                    </Form.Group>
                </Form>
            </div>


            <div className={'mb-3'}>

                <Stack direction="row" spacing={1}>

                    {selectedTaskTags.map((currTag, index) => (
                        <Chip key={currTag.id} label={currTag.name} onDelete={() => {
                            handleDelete(index)
                        }}/>
                    ))}


                </Stack>
            </div>


            <Dropdown icon='filter'
                      floating
                      labeled
                      button
                      className='icon' text='Add tag'>
                <Dropdown.Menu>

                    {allTaskTags.map((currTag, index) => (
                        <Dropdown.Item onClick={() => {
                            addTag(index)
                        }} key={currTag.id} icon='tag' text={currTag.name}/>
                    ))}


                </Dropdown.Menu>
            </Dropdown>


            <SortableTable tableData={tableData}/>


        </div>


    )
        ;

}