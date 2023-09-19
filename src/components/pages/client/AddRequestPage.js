import React, { useEffect } from 'react'
import { Card, Checkbox, Grid, Icon } from 'semantic-ui-react'
import { Form, TextArea, Button, Dropdown } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'
import { updateRequest } from '../../../actions'
import SemanticDatepicker from 'react-semantic-ui-datepickers'
import { regularApiRequest } from '../../api/regularApiRequest'
import { base_url } from '../../..'
import { useNavigate } from 'react-router-dom'
import { showToast } from '../../../App'
import { useApiRequest } from '../../api/useApiRequest'
import { set } from 'lodash'
import { Stack } from 'react-bootstrap'
import AgencyCard from '../../cards/AgencyCard'

const AddRequestPage = () => {
    const [agencyOptions, setAgencyOptions] = React.useState([])

    const { data, dataLoading, error } = useApiRequest({
        url: base_url + 'agency',
        method: 'GET'
    })

    React.useEffect(() => {
        if (data) {
            setAgencyOptions(data)
        }
    }, [data])

    const [currAgency, setCurrAgency] = React.useState(null)

    let { data: tags, dataLoading: tagDataLoading, error: tagError } = useApiRequest({
        url: base_url + 'tag',
        method: 'GET',
    });
    tags = tags?.tags

    useEffect(() => {

        console.log('all tags', tags)

    }, [tags]);


    const [selectedTags, setSelectedTags] = React.useState([])

    useEffect(() => {
        console.log('selected tags', selectedTags)
        // set agencyOptions to only those agencies which have the selected tag in their Tags field

        if (selectedTags.length === 0) {
            setAgencyOptions(data)
            return
        }

        const filteredAgencies = data.filter((agency) => {
            // check if the agency has all the selected tags
            return selectedTags.every((selectedTag) => {
                return agency.Tags.findIndex((tag) => tag.id === selectedTag.id) !== -1
            })
        })

        setAgencyOptions(filteredAgencies)

        console.log('filtered agencies', filteredAgencies)
    }, [selectedTags])


    const handleTagChange = (id) => {
        console.log('tag changed', id)
        // set agencyOptions to only those agencies which have the selected tag in their Tags field
        // make sure to check if the tag is already selected or not
        // if it is already selected, then remove it from the selected tags

        if (selectedTags.findIndex((tag) => tag.id === id) !== -1) {
            // tag is already selected
            // remove it from selected tags
            setSelectedTags(selectedTags.filter((tag) => tag.id !== id))
        } else {
            // tag is not selected
            // add it to selected tags
            setSelectedTags([...selectedTags, tags.find((tag) => tag.id === id)])
        }
    }


    const [sendButtonDisabled, setSendButtonDisabled] = React.useState(true)
    const [completionDeadlineDisabled, setCompletionDeadlineDisabled] = React.useState(true)
    const [completionDeadline, setCompletionDeadline] = React.useState(null)

    const [associatedId, setAssociatedId] = React.useState(null);

    const globalRequest = useSelector(state => state.currRequest)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleUpdateRequest = (event) => {
        console.log('called')
        dispatch(updateRequest({
            ...globalRequest, [event.target.name]: event.target.value
        }))
    }

    const handleUpdateRequestResponseDate = (event, data) => {
        const date = data.value
        if (date > completionDeadline) {
            setCompletionDeadline(null)
        }
        console.log(event)
        if (!date) {
            setCompletionDeadlineDisabled(true)
            dispatch(updateRequest({
                ...globalRequest, ['response_deadline']: null
            }))
            return
        }
        setCompletionDeadlineDisabled(false)
        const offset = date.getTimezoneOffset()
        const dateOffset = new Date(date.getTime() - (offset * 60 * 1000))
        const dateString = dateOffset.toISOString().split('T')[0]
        dispatch(updateRequest({
            ...globalRequest, ['response_deadline']: dateString
        }))
    }

    const handleUpdateRequestCompleteDate = (event, data) => {
        const date = data.value
        setCompletionDeadline(date)
        console.log(event)
        if (!date) return
        const offset = date.getTimezoneOffset()
        const dateOffset = new Date(date.getTime() - (offset * 60 * 1000))
        const dateString = dateOffset.toISOString().split('T')[0]
        dispatch(updateRequest({
            ...globalRequest, ['complete_deadline']: dateString
        }))
    }

    const handleAddTask = () => {
        dispatch(updateRequest({
            ...globalRequest, ['tasks']: [...globalRequest.tasks, {
                name: "",
                description: ""
            }]
        }))
    }

    const handleDeleteTask = (event) => {
        const index = event.target.name
        const newTasks = globalRequest.tasks.filter((task, i) => i != index)
        console.log(newTasks)
        dispatch(updateRequest({
            ...globalRequest, ['tasks']: newTasks
        }))
    }

    const handleUpdateTask = (event) => {
        const taskId = event.target.name.split('-')[2]
        const taskField = event.target.name.split('-')[1]
        const newTasks = globalRequest.tasks?.map((task, index) => {
            if (index == taskId) {
                return {
                    ...task, [taskField]: event.target.value
                }
            } else {
                return task
            }
        })
        dispatch(updateRequest({
            ...globalRequest, ['tasks']: newTasks
        }))
    }

    const submitRequest = async () => {
        const reqBody = {
            name: globalRequest.name,
            description: globalRequest.description,
            comp_deadline: globalRequest.complete_deadline,
            res_deadline: globalRequest.response_deadline,
            tasks: globalRequest.tasks
        }
        if (!reqBody.name || !reqBody.description || !reqBody.comp_deadline || !reqBody.res_deadline) {
            showToast('Please fill all fields', 'error')
            return
        }

        const completionDeadline = new Date(reqBody.comp_deadline)
        const responseDeadline = new Date(reqBody.res_deadline)
        const today = new Date()
        if (completionDeadline < today || responseDeadline < today) {
            showToast('Please select a valid date', 'error')
            return
        }

        if (completionDeadline < responseDeadline) {
            showToast('Completion deadline cannot be before response deadline', 'error')
            return
        }

        console.log(reqBody)
        const response = await regularApiRequest({
            url: base_url + 'request',
            method: 'POST',
            reqBody: reqBody
        })
        if (response.status === 200) {
            showToast('Request added succesfully', 'success')
            navigate('/')
        } else {
            showToast('Error adding request', 'error')
        }
    }

    const submitSpecificRequest = async (id, name) => {
        const reqBody = {
            name: globalRequest.name,
            description: globalRequest.description,
            comp_deadline: globalRequest.complete_deadline,
            res_deadline: globalRequest.response_deadline,
            tasks: globalRequest.tasks
        }

        if (!reqBody.name || !reqBody.description || !reqBody.comp_deadline || !reqBody.res_deadline) {
            showToast('Please fill all fields', 'error')
            return
        }

        console.log(reqBody)
        const response = await regularApiRequest({
            url: base_url + 'request/agency/' + id,
            method: 'POST',
            reqBody: reqBody
        })
        if (response.status === 200) {
            showToast('Request sent succesfully to ' + name, 'success')
            navigate('/')
        } else {
            showToast('Error adding request', 'error')
        }
    }

    return (
        <div>

            <h1>{globalRequest.name}</h1>
            <Card className='p-4' fluid>
                <Card.Meta className='mb-3'>
                    <h3>New Request</h3>
                </Card.Meta>
                <Form>
                    <Form.Input name='name' onChange={handleUpdateRequest} fluid placeholder='Title'>
                    </Form.Input>
                    <TextArea name='description' placeholder="A detailed description of your project..." onChange={handleUpdateRequest} />
                </Form>
                <h4>Response Deadline</h4>
                <SemanticDatepicker filterDate={(date) => {
                    const yesterday = new Date()
                    yesterday.setDate(yesterday.getDate() - 1)
                    return date >= yesterday
                }} onChange={handleUpdateRequestResponseDate} />
                <h4>Completion Deadline</h4>
                <SemanticDatepicker value={completionDeadline} disabled={completionDeadlineDisabled} filterDate={(date) => {
                    const responseDate = new Date(globalRequest.response_deadline)
                    if (date < responseDate) return false
                    const yesterday = new Date()
                    yesterday.setDate(yesterday.getDate() - 1)
                    return date >= yesterday
                }} onChange={handleUpdateRequestCompleteDate} />
                {globalRequest.tasks?.map((currTask, index) => (
                    <Card className='p-4' fluid>
                        <Card.Meta className='mb-3'>
                            {currTask.name ? <p>{currTask.name}</p> : <p>New Task</p>}
                        </Card.Meta>
                        <Form>
                            <Form.Input name={'task-name-' + index} onChange={handleUpdateTask} value={currTask.name} fluid placeholder='Title' />
                            <TextArea name={'task-description-' + index} value={currTask.description} placeholder="A detailed description of your task..." onChange={handleUpdateTask} />
                        </Form>

                        <Button className='mt-3' primary name={index} onClick={handleDeleteTask}>Delete</Button>
                    </Card>
                ))}

                <Button className='mt-3' primary onClick={handleAddTask}>Add Task</Button>
                <Button onClick={submitRequest} className='mt-3' positive>Broadcast</Button>
                <h2 class="ui horizontal divider header">
                    <i class="icon-usd"></i>
                    Or
                </h2>
                <center>
                    <h2>Send to a specific agency</h2>
                </center>
                <br />
                <br />

                <Grid className='ms-2' columns={2}>
                    <Grid.Row>
                        <Grid.Column width={3}>

                            <h4> <Icon name='filter' /> Filter via tags</h4>


                            <Stack spacing={2} >
                                {tags?.map((tag) => {
                                    return (
                                        <Checkbox className='mb-2' onChange={() => {
                                            handleTagChange(tag.id)
                                        }} label={tag.tag} />
                                    )
                                })}
                            </Stack>

                        </Grid.Column>

                        <Grid.Column width={7}>


                            <Dropdown
                                className='mt-0'
                                placeholder='Select Your Agency'
                                fluid
                                onChange={(e, data) => {
                                    console.log('selected', data.value)
                                    setAssociatedId(data.value)
                                    setSendButtonDisabled(false)
                                    setCurrAgency(agencyOptions.find((agency) => agency.value == data.value))
                                }}
                                search
                                selection
                                options={agencyOptions}
                            />
                            <Button onClick={() => {
                                // find agency name from assoicated id
                                const name = agencyOptions.find((agency) => agency.value == associatedId).name
                                submitSpecificRequest(associatedId, name)

                            }} className='mt-3' positive disabled={sendButtonDisabled}>Send</Button>
                        </Grid.Column>

                        <Grid.Column width={6}>
                        {currAgency &&
                        <Grid.Row>
                            <Grid.Column width={3} />
                            <Grid.Column width={13}>
                                <AgencyCard
                                    name={currAgency.name}
                                    address={currAgency.address}
                                    details={currAgency.details}
                                    website={currAgency.website}
                                    tags={currAgency.Tags}
                                    id={currAgency.id}
                                    logo={currAgency.logo}
                                />
                            </Grid.Column>
                        </Grid.Row>
                    }
                        </Grid.Column>
                    </Grid.Row>

                    


                </Grid>
            </Card>

            <br />
            <br />
        </div>
    )
}

export default AddRequestPage