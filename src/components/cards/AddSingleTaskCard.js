import React, {useEffect} from "react";
import SortableTable from "../SortableTable";
import {Button, Dropdown, Form, Grid, Icon, Label} from "semantic-ui-react";
import {Avatar, Chip, Stack} from "@mui/material";
import TaskModal from "../modals/TaskModal";
import {showToast} from "../../App";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {useApiRequest} from "../api/useApiRequest";
import {base_url} from "../../index";

export const AddSingleTaskCard = (props) => {
    const imgUrl = 'https://react.semantic-ui.com/images/wireframe/square-image.png'
    const tableData = [
        {id: 1, assigneeImgUrl: imgUrl, assignee: 'John', rating: 4.5, cost: 500},
        {id: 2, assigneeImgUrl: imgUrl, assignee: 'Amber', rating: 4.0, cost: 500},
        {id: 3, assigneeImgUrl: imgUrl, assignee: 'Leslie', rating: 3.4, cost: 500},
    ]

    let {data: allTaskTags, dataLoading, error} = useApiRequest({
        url: base_url + 'tasktag',
        method: 'GET',
    });
    allTaskTags = allTaskTags?.name

    const [selectedTaskTags, setSelectedAllTaskTags] = React.useState([])

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

                    {selectedTaskTags?.map((currTag, index) => (
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

                    {allTaskTags?.map((currTag, index) => (
                        <Dropdown.Item onClick={() => {
                            addTag(index)
                        }} key={currTag.id} icon='tag' text={currTag.name}/>
                    ))}


                </Dropdown.Menu>
            </Dropdown>


            <SortableTable tableData={tableData}/>


        </div>


    )


}