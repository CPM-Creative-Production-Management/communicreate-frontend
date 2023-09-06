import React from 'react'
import {Button, Card, Divider, Icon, Image, Label, List} from "semantic-ui-react";
import {Dialog, DialogContent, DialogTitle, SwipeableDrawer} from "@mui/material";
import {regularApiRequest} from '../api/regularApiRequest';
import {base_url} from '../..';
import {globalLoading, showToast} from '../../App';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {updateEstimation} from "../../actions";
import { useSelector } from 'react-redux';
import { updateRequests } from '../../actions';

const SingleReqCard = ({reqData, isAccepted, isOffered}) => {
    const [showDetails, setShowDetails] = React.useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const globalRequests = useSelector(state => state.requests)
    const acceptReq = async (reqId) => {
        try {
            await regularApiRequest({
                url: `${base_url}request/${reqId}/accept`,
                method: 'POST'
            })
            showToast('Request accepted', 'success')
            dispatch(updateRequests(globalRequests.filter((currReq) => {
                return currReq.RequestId !== reqId
            }
            )))
        } catch (err) {
            console.log(err)
        }
       
    }

    const hideReq = async (reqId) => {
        try {
            await regularApiRequest({
                url: `${base_url}request/${reqId}/reject`,
                method: 'POST'
            })
            showToast('Request hidden', 'success')
            const filteredRequests = globalRequests.filter((currReq) => {
                console.log(currReq.id, reqId)
                return currReq.RequestId !== reqId
            })
            dispatch(updateRequests(filteredRequests))
        } catch (err) {
            console.log(err)
        }
        
    }


    return (
        <div>
            <Card fluid>
                <Card.Content>

                    {isOffered &&

                        <Button icon labelPosition='left' floated='right' onClick={() => {
                            hideReq(reqData.RequestId)
                        }}>
                            <Icon name='ban'/>
                            Irrelevant
                        </Button>
                    }

                    {isOffered &&
                        <Button onClick={() => {
                            acceptReq(reqData.RequestId)
                        }} icon labelPosition='left' floated='right' positive>
                            <Icon name='check circle outline'/>
                            Accept
                        </Button>
                    }


                    <Button onClick={() => {
                        setShowDetails(true)
                    }} icon labelPosition='left' floated='right' primary>
                        <Icon name='list alternate outline'/>
                        View Details
                    </Button>


                    {isAccepted && !reqData.estimationExists && <Button positive onClick={() => {
                        navigate(`/add-estimation/${reqData.Request.id}`)
                    }} primary icon labelPosition='left' floated='right'>
                        <Icon name='add'/>
                        Add Estimation
                    </Button>}

                    {isAccepted && reqData.estimationExists &&
                        <Button positive onClick={() => {
                            navigate(`/edit-estimation/${reqData.Request.id}`)
                        }} primary icon labelPosition='left' floated='right'>
                            <Icon name='edit'/>
                            View Estimation
                        </Button>}


                    <Card.Header>{reqData.Request?.name}</Card.Header>
                    <Card.Meta>{reqData.Company?.name}</Card.Meta>
                    <Card.Description>
                        {reqData.Request?.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Label>
                        <Icon name='clock outline'/> Estimation Submission Deadline
                        <Label.Detail>{reqData.Request?.res_deadline}</Label.Detail>
                    </Label>

                    <Label>
                        <Icon name='cloud upload'/> Completion Deadline
                        <Label.Detail>{reqData.Request?.comp_deadline}</Label.Detail>
                    </Label>
                </Card.Content>
            </Card>


            <Dialog open={showDetails}>

                <DialogContent>


                    <Card fluid>
                        <Card.Content>


                            <Card.Header>{reqData.Request?.name}</Card.Header>
                            <Card.Meta>{reqData.Company?.name}</Card.Meta>
                            <Card.Description>
                                {reqData.Request?.description}
                            </Card.Description>

                            <Divider/>


                            <Card.Description>
                                <h4> Task List </h4>
                                <List ordered animated verticalAlign='middle'>
                                    {reqData.Request.RequestTasks?.map((task, index) => {
                                        return (
                                            <List.Item>
                                                <List.Header>{task.name}</List.Header>
                                                {task.description}
                                            </List.Item>


                                        )
                                    })}
                                </List>
                            </Card.Description>
                        </Card.Content>


                        <Card.Content fluid extra>
                            <Label>
                                <Icon name='clock outline'/> Submission Deadline
                                <Label.Detail>{reqData.Request?.res_deadline}</Label.Detail>
                            </Label>

                            <Label>
                                <Icon name='cloud upload'/> Completion Deadline
                                <Label.Detail>{reqData.Request?.comp_deadline}</Label.Detail>
                            </Label>
                        </Card.Content>

                        <Card.Content extra>

                            <Button fluid onClick={() => {
                                setShowDetails(false)
                            }}> Close

                            </Button>
                        </Card.Content>


                    </Card>

                </DialogContent>
            </Dialog>


        </div>
    )
}
export default SingleReqCard
