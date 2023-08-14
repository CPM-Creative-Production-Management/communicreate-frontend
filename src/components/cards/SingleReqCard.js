import React from 'react'
import {Button, Card, Divider, Icon, Image, Label, List} from "semantic-ui-react";
import {Dialog, DialogContent, DialogTitle, SwipeableDrawer} from "@mui/material";
import {regularApiRequest} from '../api/regularApiRequest';
import {base_url} from '../..';
import {globalLoading, showToast} from '../../App';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {updateEstimation} from "../../actions";

const SingleReqCard = ({reqData, isAccepted, isOffered}) => {
    const [showDetails, setShowDetails] = React.useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [loading, setLoading] = React.useState(false)

    const acceptReq = async (reqId) => {
        await regularApiRequest({
            url: `${base_url}request/${reqId}/accept`,
            method: 'POST'
        })
        showToast('Request accepted', 'success')
        window.location.reload()
    }

    const editEstimation = async () => {

        const currEstimation = await regularApiRequest({
            url: `${base_url}estimation/${reqData.Estimation.id}`,
            method: 'GET',
            loadingState: {loading}
        })

        if (!loading) {
            if (currEstimation.status === 200) {
                console.log('curr estimation to edit', currEstimation.data)
                // don't dispatch, call backend in the AddEstimationPage component and set the globalEstimation there
                navigate(`/add-estimation/${reqData.Request.id}`)
            } else {
                showToast('Error getting estimation', 'error')
            }
        }

        // dispatch(updateEstimation(currEstimation))
        // navigate(`/add-estimation/${reqData.id}`)
    }

    return (
        <div>
            <Card fluid>
                <Card.Content>

                    {isOffered &&

                        <Button icon labelPosition='left' floated='right'>
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
                        <Button positive onClick={editEstimation} primary icon labelPosition='left' floated='right'>
                            <Icon name='add'/>
                            View Estimation
                        </Button>}


                    <Card.Header>{reqData.Request.name}</Card.Header>
                    <Card.Meta>{reqData.Company.name}</Card.Meta>
                    <Card.Description>
                        {reqData.Request.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Label>
                        <Icon name='clock outline'/> Estimation Submission Deadline
                        <Label.Detail>{reqData.Request.res_deadline}</Label.Detail>
                    </Label>

                    <Label>
                        <Icon name='cloud upload'/> Completion Deadline
                        <Label.Detail>{reqData.Request.comp_deadline}</Label.Detail>
                    </Label>
                </Card.Content>
            </Card>


            <Dialog open={showDetails}>

                <DialogContent>


                    <Card fluid>
                        <Card.Content>


                            <Card.Header>{reqData.Request.name}</Card.Header>
                            <Card.Meta>{reqData.Company.name}</Card.Meta>
                            <Card.Description>
                                {reqData.Request.description}
                            </Card.Description>

                            <Divider/>


                            <Card.Description>
                                <h4> Task List </h4>
                                <List ordered animated verticalAlign='middle'>
                                    {reqData.Request.RequestTasks?.map((task, index) => {
                                        return (

                                            <List.Item>
                                                <List.Content>
                                                    <List.Header>{task.name}</List.Header>
                                                    {task.description}
                                                </List.Content>
                                            </List.Item>


                                        )
                                    })}
                                </List>
                            </Card.Description>
                        </Card.Content>


                        <Card.Content fluid extra>
                            <Label>
                                <Icon name='clock outline'/>Submission Deadline
                                <Label.Detail>{reqData.Request.res_deadline}</Label.Detail>
                            </Label>

                            <Label>
                                <Icon name='cloud upload'/>Completion Deadline
                                <Label.Detail>{reqData.Request.comp_deadline}</Label.Detail>
                            </Label>
                        </Card.Content>

                        <Card.Content extra>

                            {/* <Button icon labelPosition='left'>
                                <Icon name='ban'/>
                                Irrelevant
                            </Button>

                            <Button onClick={()=>{acceptReq(reqData.RequestId)}} icon labelPosition='left' floated='right' positive>
                            <Icon name='check circle outline'/>
                                Accept
                            </Button>  */}

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
