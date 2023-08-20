import React, {useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "../../fragments/Dashboard";
import {Archive} from "../../fragments/Archive";
import {Card, Input, Label, Segment, Form, Button, Icon, Divider, Message, List, Header, Comment} from "semantic-ui-react";
import AddTaskModal from "../../modals/AddTaskModal";
import {SingleTaskCard} from "../../cards/SingleTaskCard";
import {Avatar, Chip, Stack, Grid} from "@mui/material";
import {Dropdown} from "semantic-ui-react";

import {useSelector, useDispatch} from "react-redux";
import {updateEstimation, resetCurrEstimation} from "../../../actions";
import {Textarea} from "@nextui-org/react";
import {showToast} from "../../../App";


import {useNavigate, useParams} from "react-router-dom";
import {useApiRequest} from '../../api/useApiRequest';
import {base_url} from '../../../index';
import {regularApiRequest} from '../../api/regularApiRequest';
import Comments from "../../custom/Comments";

const drawerBleeding = 56;


export const AddEstimationPage = () => {
    const navigate = useNavigate()

    const {id} = useParams()

    // get the global Estimation from redux store
    const globalEstimation = useSelector(state => state.currEstimation)
    // dispatch an action to the reducer
    const dispatch = useDispatch()

    let [requestData, setRequestData] = useState({
        "id": 8,
        "name": "",
        "res_deadline": "",
        "comp_deadline": "",
        "description": "",
        "RequestTasks": [],
        "company": {
            "id": 3,
            "name": "",
            "description": "",
            "address": "",
            "phone": "",
            "email": "",
            "website": "",
            "logo": ""
        },
        "ReqAgency": {
            "id": 10,
            "accepted": null,
            "finalized": null,
            "AgencyId": 2,
            "RequestId": 8,
            "CompanyId": 3
        }
    })

    const {data: reqData, dataLoading: dataLoadingReq, error} = useApiRequest({
        url: base_url + 'request/' + id,
        method: 'GET',
    })
    const [extraCost, setExtraCost] = useState(0)

    useEffect(() => {
        if (!dataLoadingReq && reqData) {
            console.log('request data', reqData)

            if (reqData.estimationExists) {
                dispatch(updateEstimation(reqData.ReqAgency.Estimation))

            } else {
                dispatch(resetCurrEstimation())
            }

            console.log('global estimation', globalEstimation)
            setRequestData(reqData)
        }
    }, [dataLoadingReq])

    useEffect(() => {
        setExtraCost(globalEstimation.extraCost)
    }, [globalEstimation])


    const [openAddTaskModal, setOpenAddTaskModal] = useState(false)

    const sendEstimation = async () => {
        console.log('sending estimation to backend', globalEstimation)

        if (globalEstimation.tasks?.length === 0) {
            showToast('Please add at least one task', 'error')
            return
        }

        // generate the estimation body
        let estimationBody = {
            title: globalEstimation.title,
            description: globalEstimation.description,
            company: globalEstimation.company,
            deadline: globalEstimation.deadline,
            cost: globalEstimation.cost + extraCost,

            ReqAgencyId: requestData.ReqAgency.id,

            // get only the ids of the tags
            tags: globalEstimation.tags.map((tag) => tag.id),
            tasks: globalEstimation.tasks?.map((task) => {
                return {
                    name: task.name,
                    // description: task.description,
                    cost: task.cost,
                    // get only the ids of the employees
                    employees: task.Employees.map((emp) => emp.id),
                    // get only the ids of the tags
                    tags: task.tags.map((tag) => tag.id),
                }
            })
        }

        console.log('estimation body', estimationBody)
        const response = await regularApiRequest({
            url: base_url + 'estimation',
            method: 'POST',
            reqBody: estimationBody
        })

        console.log('estimation body', estimationBody)

        if (response.status === 200) {
            showToast('Estimation sent successfully', 'success')
            dispatch(resetCurrEstimation())
            navigate('/')
        } else {
            showToast('Estimation could not be sent', 'error')
        }


    }

    let {data: allEstimationTags, dataLoading: tagDataLoading, error: tagError} = useApiRequest({
        url: base_url + 'tag',
        method: 'GET',
    });
    allEstimationTags = allEstimationTags?.tags

    useEffect(() => {

        console.log('all tags', allEstimationTags)

    }, [allEstimationTags]);

    const handleDeleteTag = (index) => {
        console.log('delete tag', index)
        // showToast(index, {toastType: 'success'})

        dispatch(updateEstimation({...globalEstimation, tags: globalEstimation.tags.filter((tag, i) => i !== index)}))

    }

    const addTag = (tag_id) => {
        console.log('add tag', tag_id)
        // showToast(tag_id, {toastType: 'success'})
        // do not add if the item already exists
        if (globalEstimation.tags.includes(allEstimationTags[tag_id])) {
            showToast('Tag already added', 'error')

        } else {
            dispatch(updateEstimation({
                ...globalEstimation,
                tags: [...globalEstimation.tags, allEstimationTags[tag_id]]
            }))
        }
    }

    useEffect(() => {
        // update the globalEstimation cost via redux by looping over all tasks
        let totalEstimationCost = 0
        globalEstimation.tasks?.map((currTask) => {
            totalEstimationCost += currTask.cost
        })
        dispatch(updateEstimation({
            ...globalEstimation, cost: totalEstimationCost
        }))
    }, [globalEstimation.tasks]);

    const handleExtraCost = (event) => {
        if (event.target.value < 0) {
            showToast('Extra cost cannot be negative', 'error')
            return
        }
        setExtraCost(parseInt(event.target.value))

    }

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleCollapse = () => {
        setIsExpanded(!isExpanded);
    };


    return (
        <div>

            <Card className='p-4' fluid>
                <Card.Meta>
                    <h3>Project Overview</h3>
                </Card.Meta>

                <h1>{requestData.name}</h1>

                <Card.Meta>

                    <Label>
                        <Icon name='clock outline'/>Company
                        <Label.Detail>{requestData.company.name}</Label.Detail>
                    </Label>

                    <Label>
                        <Icon name='clock outline'/>Submission Deadline
                        <Label.Detail>{requestData.res_deadline}</Label.Detail>
                    </Label>
                </Card.Meta>

                <div className={'mb-2 mt-4'}>

                    <Stack direction="row" spacing={1}>

                        {globalEstimation.tags?.map((currTag, index) => (
                            <Chip key={currTag.id} label={currTag.tag} onDelete={() => {
                                handleDeleteTag(index)
                            }}/>
                        ))}

                    </Stack>
                </div>

                <div className='md-2 xs-2 mb-3'>

                    <Dropdown icon='filter'
                              floating
                              labeled
                              button

                              className='icon' text='Add tag'>
                        <Dropdown.Menu>

                            {allEstimationTags?.map((currTag, index) => (
                                <Dropdown.Item onClick={() => {
                                    addTag(index)
                                }} key={currTag.id} icon='tag' text={currTag.tag}/>
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>
                </div>


                <Message
                    icon='clipboard outline'
                    header='Description'
                    content={requestData.description}/>


                <Card.Description>
                    <h4> Task List </h4>
                    <List ordered animated verticalAlign='middle'>
                        {requestData.RequestTasks?.map((task, index) => {
                            return (
                                <List.Item key={index}>
                                    <List.Header>{task.name}</List.Header>
                                    {task.description}
                                </List.Item>


                            )
                        })}
                    </List>
                </Card.Description>


                <Divider/>

                {globalEstimation.tasks?.length > 0 ?
                    globalEstimation.tasks?.map((task, index) => {
                        return (<div>
                                <SingleTaskCard show={openAddTaskModal} singleTask={task} taskIndex={index}
                                                setShow={setOpenAddTaskModal}/>
                                {index < globalEstimation.tasks?.length - 1 ? <Divider/> : null}

                            </div>
                        )
                    })
                    : <div className='text-center'><h4>No tasks added yet </h4> <br/></div>}


            </Card>



            {/*todo: estimation na thakle comment korte diboi na*/}
            <Comment.Group threaded>
                <Header as='h3' dividing>
                    Comments
                </Header>
            {globalEstimation.id ?
                <Comments estimationId={globalEstimation?.id}/>
                : null}

                <span> <Input  placeholder='add a comment...' /> <Button icon='send' /> </span>

            </Comment.Group>

            <div className='estimation-summary'>
                <Card raised fluid>
                    <Card.Content>

                        <div className={`collapsible-div ${isExpanded ? 'expanded' : ''}`}>

                            <center>
                                <Button circular icon labelPosition='right' onClick={toggleCollapse}>
                                    Summary{isExpanded ? <Icon name={'angle down'}/> : <Icon name={'angle up'}/>}
                                </Button>
                            </center>


                            <Message
                                icon='money bill alternate outline'
                                header={globalEstimation.cost + ' + ' + extraCost + ' ৳'}
                                content='Total Estimated Cost of the Project'
                            />


                            <Input fluid name='extraCost' onChange={handleExtraCost} value={extraCost} className='mt-2'
                                   label='Extra Cost' type='number' placeholder='Amount'/>

                            <br/>

                            <Grid container spacing={1}>
                                <Grid item xs={6} md={6}>
                                    <Button fluid onClick={() => {
                                        setOpenAddTaskModal(true)
                                    }}>
                                        <Icon name='add'/>
                                        Add Task
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Button fluid onClick={sendEstimation} positive animated>

                                        <Icon name='send'/>
                                        Send Estimation

                                    </Button>
                                </Grid>

                            </Grid>
                        </div>


                    </Card.Content>


                </Card>
            </div>


            <Divider/>
            <br/><br/>
            <br/><br/>


            <AddTaskModal show={openAddTaskModal}
                          setShow={setOpenAddTaskModal}
            />

        </div>
    );
}