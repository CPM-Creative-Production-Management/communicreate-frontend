import React from 'react'
import {Button, Card, Divider, Icon, Image, Label, List} from "semantic-ui-react";
import Modal from "react-bootstrap/Modal";
import {Dialog, DialogContent, DialogTitle} from "@mui/material";
import {BarLoader} from "react-spinners";

const SingleReqCard = ({reqData, isAccepted}) => {
    const [showDetails, setShowDetails] = React.useState(false)
    return (
        <div>
            <Card fluid>
                <Card.Content>

                    <Button icon labelPosition='left' floated='right'>
                        <Icon name='ban'/>
                        Irrelevant
                    </Button>

                    <Button icon labelPosition='left' floated='right' positive>
                        <Icon name='check circle outline'/>
                        Accept
                    </Button>

                    <Button onClick={() => {
                        setShowDetails(true)
                    }} icon labelPosition='left' floated='right' primary>
                        <Icon name='list alternate outline'/>
                        View Details
                    </Button>


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

                            <Button icon labelPosition='left'>
                                <Icon name='ban'/>
                                Irrelevant
                            </Button>

                            <Button icon labelPosition='left' positive>
                                <Icon name='check circle outline'/>
                                Accept
                            </Button>

                            <Button onClick={()=>{setShowDetails(false)}} icon labelPosition='left'>
                                <Icon name='cancel'/>
                                Close
                            </Button>
                            </Card.Content>



                    </Card>

                </DialogContent>
            </Dialog>


        </div>
)
}
export default SingleReqCard
