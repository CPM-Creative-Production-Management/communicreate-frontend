import React from 'react'
import {Button, Card, Divider, Icon, Image, Label, List} from "semantic-ui-react";
import {Dialog, DialogContent, DialogTitle, SwipeableDrawer} from "@mui/material";
import {regularApiRequest} from '../api/regularApiRequest';
import {base_url} from '../..';
import {globalLoading, showToast} from '../../App';
import {useNavigate} from 'react-router-dom';
import {useDispatch} from "react-redux";
import {updateEstimation} from "../../actions";

export const SingleEstimationCard = ({estimationData, isRejected, isOngoing}) => {
    const [showDetails, setShowDetails] = React.useState(false)
    const navigate = useNavigate()

    const acceptReq = async (reqId) => {
        // await regularApiRequest({
        //     url: `${base_url}request/${reqId}/accept`,
        //     method: 'POST'
        // })
        // showToast('Request accepted', 'success')
        // window.location.reload()
    }


    return (
        <div>
            <Card fluid>
                <Card.Content>

                    {isOngoing &&

                        <Button negative icon labelPosition='left' floated='right'>
                            <Icon name='ban'/>
                            Reject
                        </Button>
                    }

                    {isOngoing &&
                        <Button onClick={() => {
                            acceptReq(estimationData.RequestId)
                        }} icon labelPosition='left' floated='right' positive>
                            <Icon name='check circle outline'/>
                            Finalize (rakhbo eta?)
                        </Button>
                    }


                    <Button onClick={() => {
                        setShowDetails(true)
                    }} icon labelPosition='left' floated='right' primary>
                        <Icon name='list alternate outline'/>
                        View Details
                    </Button>

                    {isOngoing && estimationData.estimationExists &&
                        <Button positive onClick={() => {
                            navigate(`/edit-estimation/${estimationData.Request.id}`)
                        }} primary icon labelPosition='left' floated='right'>
                            <Icon name='edit'/>
                            View Estimation
                        </Button>}


                    <Card.Header>{estimationData.title}</Card.Header>
                    <Card.Meta>{estimationData.Company.name}</Card.Meta>
                    <Card.Description>
                        {estimationData.description}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Label>
                        <Icon name='clock outline'/> Estimation Submission Deadline
                        <Label.Detail>{estimationData.deadline}</Label.Detail>
                    </Label>


                </Card.Content>
            </Card>



            <List divided relaxed>
                <List.Item>
                    <List.Icon name='github' size='large' verticalAlign='middle' />
                    <List.Content>
                        <List.Header as='a'>Semantic-Org/Semantic-UI</List.Header>
                        <List.Description as='a'>Updated 10 mins ago</List.Description>
                    </List.Content>
                </List.Item>

            </List>



            {/*<Dialog open={showDetails}>*/}

            {/*    <DialogContent>*/}


            {/*        <Card fluid>*/}
            {/*            <Card.Content>*/}


            {/*                <Card.Header>{estimationData.Request.name}</Card.Header>*/}
            {/*                <Card.Meta>{estimationData.Company.name}</Card.Meta>*/}
            {/*                <Card.Description>*/}
            {/*                    {estimationData.Request.description}*/}
            {/*                </Card.Description>*/}

            {/*                <Divider/>*/}


            {/*                <Card.Description>*/}
            {/*                    <h4> Task List </h4>*/}
            {/*                    <List ordered animated verticalAlign='middle'>*/}
            {/*                        {estimationData.Request.RequestTasks?.map((task, index) => {*/}
            {/*                            return (*/}
            {/*                                <List.Item>*/}
            {/*                                    <List.Header>{task.name}</List.Header>*/}
            {/*                                    {task.description}*/}
            {/*                                </List.Item>*/}


            {/*                            )*/}
            {/*                        })}*/}
            {/*                    </List>*/}
            {/*                </Card.Description>*/}
            {/*            </Card.Content>*/}


            {/*            <Card.Content fluid extra>*/}
            {/*                <Label>*/}
            {/*                    <Icon name='clock outline'/> Submission Deadline*/}
            {/*                    <Label.Detail>{estimationData.Request.res_deadline}</Label.Detail>*/}
            {/*                </Label>*/}

            {/*                <Label>*/}
            {/*                    <Icon name='cloud upload'/> Completion Deadline*/}
            {/*                    <Label.Detail>{estimationData.Request.comp_deadline}</Label.Detail>*/}
            {/*                </Label>*/}
            {/*            </Card.Content>*/}

            {/*            <Card.Content extra>*/}

            {/*                /!* <Button icon labelPosition='left'>*/}
            {/*                    <Icon name='ban'/>*/}
            {/*                    Irrelevant*/}
            {/*                </Button>*/}

            {/*                <Button onClick={()=>{acceptReq(reqData.RequestId)}} icon labelPosition='left' floated='right' positive>*/}
            {/*                <Icon name='check circle outline'/>*/}
            {/*                    Accept*/}
            {/*                </Button>  *!/*/}

            {/*                <Button fluid onClick={() => {*/}
            {/*                    setShowDetails(false)*/}
            {/*                }}> Close*/}

            {/*                </Button>*/}
            {/*            </Card.Content>*/}


            {/*        </Card>*/}

            {/*    </DialogContent>*/}
            {/*</Dialog>*/}


        </div>
    )
}

