import React, {useEffect, useState} from "react";
import SortableTable from "../SortableTable";
import {Button, Dropdown, Form, Grid, Icon, Input, Label, Message} from "semantic-ui-react";
import {Autocomplete, Avatar, Chip, CircularProgress, Stack, TextField} from "@mui/material";
import AddTaskModal from "../modals/AddTaskModal";
import {showToast} from "../../App";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import {useApiRequest} from "../api/useApiRequest";
import {base_url} from "../../index";
import {AiOutlineFileSearch} from "react-icons/ai";
import TableEmpList from "../TableEmpList";


export const AddSingleTaskCard = ({currTask, setCurrTask}) => {



    const updateCurrTask = (event) => {
        setCurrTask({
            ...currTask, [event.target.name]: event.target.value
        })
        console.log('curr task', currTask)
    }

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

        console.log('selected tags', currTask.tags)
        // showToast(allTags, {toastType: 'success'})

    }, [currTask.tags]);

    const handleDeleteTag = (index) => {
        console.log('delete tag', index)
        // showToast(index, {toastType: 'success'})

        setCurrTask({...currTask, tags: currTask.tags.filter((tag, i) => i !== index)})
    }

    const addTag = (tag_id) => {
        console.log('add tag', tag_id)
        // showToast(tag_id, {toastType: 'success'})
        // do not add if the item already exists
        if (currTask.tags.includes(allTaskTags[tag_id])) {
            showToast('Tag already added', 'error')

        } else {
            setCurrTask({...currTask, tags: [...currTask.tags, allTaskTags[tag_id]]})
        }
    }


    // todo: need to call backend to get all Employees
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
        if (currTask.Employees.includes(employeeList[index])) {
            showToast('Employee already exists', 'error')

        } else {
            setCurrTask({...currTask, Employees: [...currTask.Employees, employeeList[index]]})
        }

    }

    useEffect(() => {
        console.log('curr task:', currTask)
    }, [currTask]);

    useEffect(() => {
        console.log('selected emp:', currTask.Employees)
        calculateTaskCost()
    }, [currTask.Employees]);

    const calculateTaskCost = () => {
        let totalCost = 0
        currTask.Employees.map((currEmp) => {
            totalCost += currEmp.salary
        })
        setCurrTask({...currTask, cost: totalCost})
    }


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

                    {currTask.tags?.map((currTag, index) => (
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


            <TableEmpList tableData={currTask.Employees} isDisplaying={false}/>

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
                header={currTask.cost}
                content='Estimated from the assigned Employees salary'
            />


        </div>


    )


}