import React, { useEffect, useRef, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../../fragments/Dashboard";
import { Archive } from "../../fragments/Archive";
import { Card, Input, Label, Segment, Button, Icon, Divider, Message, List, Header, Comment } from "semantic-ui-react";
import AddTaskModal from "../../modals/AddTaskModal";
import { SingleTaskCard } from "../../cards/SingleTaskCard";
import { Avatar, Chip, Stack, Grid } from "@mui/material";
import { Dropdown } from "semantic-ui-react";

import { useSelector, useDispatch } from "react-redux";
import { updateComments, updateRequest } from '../../../actions';

import { updateEstimation, resetCurrEstimation } from "../../../actions";
import Textarea from '@mui/joy/Textarea';
import { showToast } from "../../../App";


import { useNavigate, useParams } from "react-router-dom";
import { useApiRequest } from '../../api/useApiRequest';
import { base_url } from '../../../index';
import { regularApiRequest } from '../../api/regularApiRequest';
import Comments from "../../custom/Comments";


import { commentApiRequest } from '../../api/commentApiRequest';



export const AddEstimationPage = (props) => {
    const navigate = useNavigate()
    const params = useParams()


    const { id } = useParams()

    // get the global Estimation from redux store
    const globalEstimation = useSelector(state => state.currEstimation)
    const globalComments = useSelector(state => state.comments)
    // dispatch an action to the reducer
    const dispatch = useDispatch()

    const pastelColors = [
        '#FFB6C1', // Pink
        '#FCFA60', // Yellow
        '#87D697', // Mint
        '#ADD8E6', // Blue
        '#FFA07A', // Salmon
        '#C999DE', // Lavender
    ];

    const handleChangeColor = (id) => {
        return pastelColors[id % pastelColors.length];
    };

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

    const { data: reqData, dataLoading: dataLoadingReq, error } = useApiRequest({
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

            dispatch(updateRequest(reqData));


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
                    id: task.id ? task.id : 0,
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
        let response, method
        if (props.edit) {
            response = await regularApiRequest({
                url: base_url + 'estimation/' + globalEstimation.id,
                method: 'PUT',
                reqBody: estimationBody
            })
        } else {
            response = await regularApiRequest({
                url: base_url + 'estimation',
                method: 'POST',
                reqBody: estimationBody
            })
        }

        console.log('estimation body', estimationBody)

        if (response.status === 200) {
            showToast('Estimation sent successfully', 'success')
            dispatch(resetCurrEstimation())
            navigate('/')
        } else {
            showToast('Estimation could not be sent', 'error')
        }


    }

    let { data: allEstimationTags, dataLoading: tagDataLoading, error: tagError } = useApiRequest({
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

        dispatch(updateEstimation({
            ...globalEstimation, tags: globalEstimation.tags.filter((tag, i) => i !== index)
        }))

    }

    const addTag = (tagIndex) => {
        console.log('add tag', tagIndex)
        // showToast(tag_id, {toastType: 'success'})
        // do not add if the item already exists
        if (globalEstimation.tags.includes(allEstimationTags[tagIndex])) {
            showToast('Tag already added', 'error')

        } else {
            dispatch(updateEstimation({
                ...globalEstimation,
                tags: [...globalEstimation.tags, allEstimationTags[tagIndex]]
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

        if (event.target.value === '') {
            setExtraCost(0)

        } // if the input is a number
        else if (!isNaN(event.target.value)) {
            // setExtraCost('')
            // remove the leading zeros from the string

            setExtraCost(parseInt(event.target.value))
        }

    }

    const [isExpanded, setIsExpanded] = useState(true);

    const toggleCollapse = () => {
        setIsExpanded(!isExpanded);
    };

    // const commentRef = useRef('');
    const [newComment, setNewComment] = useState('')
    const [commentPosting, setCommentPosting] = useState(false)

    const addComment = async () => {
        // check if comment is empty
        if (newComment.length === 0) {
            showToast('Comment cannot be empty', 'error')
            return
        }

        let commentBody = {
            body: newComment
        }

        console.log('comment body', commentBody)

        setCommentPosting(true)
        const response = await commentApiRequest({
            url: base_url + `estimation/${globalEstimation.id}/comment`,
            method: 'POST',
            reqBody: commentBody
        })

        console.log('comment response', response)

        if (response && response.status === 200) {
            showToast('Comment added successfully', 'success')
            setNewComment('')
            // add a new comment to the global comments

            setCommentPosting(false)


            dispatch(updateComments([...globalComments, response.data.comment]));
        } else {
            // showToast('Comment could not be added', 'error')
        }


    }


    return (
        <div>

            <Card className='p-4' fluid>
                <Card.Meta>
                    <h3>Project Overview</h3>
                </Card.Meta>

                <h1>{requestData.name}</h1>

                <Card.Meta>

                    <Label>
                        <Icon name='briefcase' /> Company
                        <Label.Detail>{requestData.company.name}</Label.Detail>
                    </Label>

                    <Label>
                        <Icon name='clock outline' /> Submission Deadline
                        <Label.Detail>{requestData.res_deadline}</Label.Detail>
                    </Label>
                </Card.Meta>

                <div className={'mb-2 mt-4'}>

                    <Stack direction="row" spacing={1}>

                        {globalEstimation.tags?.map((currTag, index) => (
                            <Chip key={currTag.id} label={currTag.tag} style={{backgroundColor: handleChangeColor(currTag.id)}}
                             onDelete={() => {
                                handleDeleteTag(index)
                            }} />
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
                                }} key={currTag.id} icon='tag' text={currTag.tag} />
                            ))}

                        </Dropdown.Menu>
                    </Dropdown>
                </div>


                <Message
                    icon='clipboard outline'
                    header='Description'
                    content={requestData.description} />


                <Card.Description>
                    <h4>Requested Task List </h4>
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


                <Divider />

                {globalEstimation.tasks?.length > 0 ?
                    globalEstimation.tasks?.map((task, index) => {
                        return (<div>
                            <SingleTaskCard show={openAddTaskModal} singleTask={task} taskIndex={index}
                                setShow={setOpenAddTaskModal} edit={props.edit} finalized={reqData?.ReqAgency.finalized} />
                            {index < globalEstimation.tasks?.length - 1 ? <Divider /> : null}

                        </div>
                        )
                    })
                    : <div className='text-center'><h4>No tasks added yet </h4> <br /></div>}


            </Card>


            {requestData.estimationExists &&
                <Comment.Group threaded>
                    <Header as='h3' dividing>
                        Comments
                    </Header>
                    {globalEstimation.id ?
                        <Comments estimationId={globalEstimation?.id} />
                        : null}

                    <span>
                        <Textarea disabled={commentPosting} size="md" name='newComment' value={newComment} onChange={(e) => {
                            setNewComment(e.target.value)
                        }} placeholder='add a comment...' />

                        <Button loading={commentPosting} className='mt-3' onClick={addComment} primary>
                            <Icon name='send' /> Comment
                        </Button>
                    </span>

                </Comment.Group>
            }

            <div className='estimation-summary'>
                <Card raised fluid>
                    <Card.Content>

                        <div className={`collapsible-div ${isExpanded ? 'expanded' : ''}`}>

                            <center>
                                <Button circular icon labelPosition='right' onClick={toggleCollapse}>
                                    Summary{isExpanded ? <Icon name={'angle down'} /> : <Icon name={'angle up'} />}
                                </Button>
                            </center>


                            <Message
                                icon='money bill alternate outline'
                                header={globalEstimation.cost + ' + ' + extraCost + ' ৳'}
                                content='Total Estimated Cost of the Project'
                            />


                            <Input fluid name='extraCost' onChange={handleExtraCost} value={parseInt(extraCost)}
                                className='mt-2'
                                label='Extra Cost' type='number' placeholder='Amount' />

                            <br />

                            <Grid container spacing={1}>
                                <Grid item xs={6} md={6}>
                                    <Button fluid onClick={() => {
                                        setOpenAddTaskModal(true)
                                    }}>
                                        <Icon name='add' />
                                        Add Task
                                    </Button>
                                </Grid>
                                <Grid item xs={6} md={6}>
                                    <Button fluid onClick={sendEstimation} positive animated>

                                        <Icon name='send' />
                                        Send Estimation

                                    </Button>
                                </Grid>

                            </Grid>
                        </div>


                    </Card.Content>


                </Card>
            </div>


            <Divider />
            <br /><br />
            <br /><br />


            <AddTaskModal show={openAddTaskModal}
                setShow={setOpenAddTaskModal}
            />

        </div>
    );
}