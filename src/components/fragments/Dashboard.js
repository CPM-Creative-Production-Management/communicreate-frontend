import React from 'react';
import {Card, Grid, Icon} from "semantic-ui-react";
import toast from "react-hot-toast";

import '../../global.css'

export const Dashboard = () => {

    return (
        <div>
            <br/>

            <Grid className='ms-2' columns={4}>
                <Grid.Row>
                    <Grid.Column>

                        <Card fluid>
                            <Card.Content>
                                <br/>

                                <div className='icon-bg'>
                                    <Icon size='huge' color='teal' name='play'/>
                                </div>

                                <br/><br/>


                                <Card.Header>Unfinished Estimations</Card.Header>
                                <br/>
                                <Card.Meta>
                                    These are the estimations that you have started but not yet completed.
                                    Negotiation is going on with the clients.
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra onClick={() => {
                                toast.success('2 Estimations');
                            }}>
                                <a>
                                    <Icon name='calculator'/>
                                    2 Estimations
                                </a>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column>

                        <Card fluid>
                            <Card.Content>
                                <br/>

                                <div className='icon-bg'>
                                    <Icon size='huge' color='teal' name='play'/>
                                </div>

                                <br/><br/>


                                <Card.Header>Finalized Estimations</Card.Header>
                                <br/>
                                <Card.Meta>
                                    These are the estimations that have been accepted.
                                    You can now start working on the projects.
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra onClick={() => {
                                toast.success('8 Estimations');
                            }}>
                                <a>
                                    <Icon name='calculator'/>
                                    8 Estimations
                                </a>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column>

                        <Card fluid>
                            <Card.Content>
                                <br/>

                                <div className='icon-bg'>
                                    <Icon size='huge' color='teal' name='play'/>
                                </div>

                                <br/><br/>


                                <Card.Header>Finalized Estimations</Card.Header>
                                <br/>
                                <Card.Meta>
                                    These are the estimations that have been accepted.
                                    You can now start working on the projects.
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra onClick={() => {
                                toast.success('8 Estimations');
                            }}>
                                <a>
                                    <Icon name='calculator'/>
                                    8 Estimations
                                </a>
                            </Card.Content>
                        </Card>
                    </Grid.Column>

                    <Grid.Column></Grid.Column>
                </Grid.Row>
            </Grid>


        </div>
    );
}