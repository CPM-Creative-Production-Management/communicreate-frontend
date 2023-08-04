import React, {useEffect, useState} from "react";
import SortableTable from "../SortableTable";
import {Button, Dropdown, Form, Grid, Icon, Input, Label, Message} from "semantic-ui-react";
import {Autocomplete, Avatar, Chip, CircularProgress, Stack, TextField} from "@mui/material";
import TaskModal from "../modals/TaskModal";
import {showToast} from "../../App";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {useApiRequest} from "../api/useApiRequest";
import {base_url} from "../../index";
import {AiOutlineFileSearch} from "react-icons/ai";
import TableEmpList from "../TableEmpList";

export const AddSingleTaskCard = () => {
    const [selectedTaskTags, setSelectedTaskTags] = useState([])
    // const [selectedEmployees, setSelectedEmployees] = useState([])

    let [currTask, setCurrTask] = useState(
        {
            name: "",
            description: "",
            cost: 0,
            employees: [],
            tags: [],
        });
    currTask.tags = selectedTaskTags

    const updateCurrTask = (event) => {
        setCurrTask({
            ...currTask, [event.target.name]: event.target.value
        })
        console.log('curr task', currTask)
    }

    const imgUrl = 'https://react.semantic-ui.com/images/wireframe/square-image.png'
    const tableData = [
        {id: 1, image: imgUrl, assignee: 'John', rating: 4.5, cost: 500},
        {id: 2, image: imgUrl, assignee: 'Amber', rating: 4.0, cost: 500},
        {id: 3, image: imgUrl, assignee: 'Leslie', rating: 3.4, cost: 500},
    ]

    // let {data: allTaskTags, dataLoading, error} = useApiRequest({
    //     url: base_url + 'tasktag',
    //     method: 'GET',
    // });
    // allTaskTags = allTaskTags?.name

    const [allTaskTags, setAllTaskTags] = useState([
        {id: 1, name: 'tag1'},
        {id: 2, name: 'tag2'},
    ]);


    useEffect(() => {

        console.log('selected tags', selectedTaskTags)
        // showToast(allTags, {toastType: 'success'})

    }, [selectedTaskTags]);

    const handleDeleteTag = (index) => {
        console.log('delete tag', index)
        // showToast(index, {toastType: 'success'})
        setSelectedTaskTags(selectedTaskTags.filter((currTag, currIndex) => {
            return currIndex !== index
        }))
    }

    const addTag = (tag_id) => {
        console.log('add tag', tag_id)
        // showToast(tag_id, {toastType: 'success'})
        // do not add if the item already exists
        if (selectedTaskTags.includes(allTaskTags[tag_id])) {
            showToast('Tag already exists', 'error')

        } else {
            setSelectedTaskTags([...selectedTaskTags, allTaskTags[tag_id]])
        }
    }


    const [employeeList, setEmployeeList] = useState([
        {
            "id": 1,
            "name": "John Bonham",
            "text": "John Bonham",
            "image": 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
            "dob": "1948-05-31",
            "address": "Led Zeppelin Headquarters",
            "rating": 4,
            "salary": 670,
            "AgencyId": 1
        },
        {
            "id": 2,
            "name": "ab Bonham",
            "text": "dd Bonham",
            "image": 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
            "dob": "1948-05-31",
            "address": "Led Zeppelin Headquarters",
            "rating": 4,
            "salary": 670,
            "AgencyId": 1
        },
        {
            "id": 3,
            "name": "dd Bonham",
            "text": "dd Bonham",
            "image": 'https://react.semantic-ui.com/images/avatar/small/jenny.jpg',
            "dob": "1948-05-31",
            "address": "Led Zeppelin Headquarters",
            "rating": 4,
            "salary": 670,
            "AgencyId": 1
        },

    ]);


    const [empSearch, setEmpSearch] = useState('')
    const getFilteredEmployeeList = () => {
        // call backend api to get filtered list using empSearch string


    }

    const addEmpToTask = (index) => {
        console.log('add employee:', employeeList[index])
        console.log('index:', index)
        // showToast(tag_id, {toastType: 'success'})
        // do not add if the item already exists
        if (currTask.employees.includes(employeeList[index])) {
            showToast('Employee already exists', 'error')

        } else {
            setCurrTask({...currTask, employees: [...currTask.employees, employeeList[index]]})
        }

    }

    useEffect(() => {
        console.log('curr task emp:', currTask.employees)
    }, [currTask]);

    useEffect(() => {
        console.log('selected emp:', currTask.employees)
    },[currTask.employees]);


    return (
        <div className='ms-4 me-4 mb-4'>
            <br/>
            <div>
                <Form>
                    <Form.Group widths='equal'>
                        <Form.Input onChange={updateCurrTask} fluid placeholder='Task Name' name='name'
                                    value={currTask.name}/>
                    </Form.Group>
                </Form>
            </div>


            <div className={'mb-3'}>

                <Stack direction="row" spacing={1}>

                    {selectedTaskTags?.map((currTag, index) => (
                        <Chip key={currTag.id} label={currTag.name} onDelete={() => {
                            handleDeleteTag(index)
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


            <TableEmpList tableData={currTask.employees}/>

            <Dropdown placeholder='Search Employee...'
                      fluid
                      clearable
                      search
                      value={empSearch}
                      name='empSearch'
                      onChange={getFilteredEmployeeList}
                      selection>
                <Dropdown.Menu scrolling className={'mt-2'}>
                    {employeeList.map((option, index) => (
                        <Dropdown.Item onClick={() => {
                            addEmpToTask(index)
                        }} key={option.id} {...option}/>
                    ))}
                </Dropdown.Menu>
            </Dropdown>


            <Message
                icon='money bill alternate outline'
                header='200'
                content='Estimated from the assigned employees salary'
            />


        </div>


    )


}