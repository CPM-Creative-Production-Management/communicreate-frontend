import React from 'react';
import { Card, Grid, Icon } from "semantic-ui-react";


import '../../global.css'
import { DashboardCard } from "../cards/DashboardCard";
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import GeneralChart from '../utils/GeneralChart'
import { useApiRequest } from '../api/useApiRequest';
import { base_url } from '../..';


export const Dashboard = () => {

    const { data: data, loading: requestsLoading, error } = useApiRequest({
        url: base_url + 'dashboard',
        method: 'GET',
    })

    let navigate = useNavigate();

    const userData1 = [
        {
            id: 1,
            year: 2016,
            userGain: 80000,
            userLost: 823,
        },
        {
            id: 2,
            year: 2017,
            userGain: 45677,
            userLost: 345,
        },
        {
            id: 3,
            year: 2018,
            userGain: 78888,
            userLost: 555,
        },
        {
            id: 4,
            year: 2019,
            userGain: 90000,
            userLost: 4555,
        },
        {
            id: 5,
            year: 2020,
            userGain: 4300,
            userLost: 234,
        },
    ];


    return (
        <div>
            {/* <Button onClick={() => {
                        navigate("/add-estimation")
                    }} primary className='mt-3 fab' size='large' >Add new Estimation</Button> */}



            <Grid className='ms-2' columns={5}>
                <Grid.Row>
                    <Grid.Column>
                        <DashboardCard iconName='forward' colorName='teal' cardHeader='Ongoing Projects'
                            cardDesc='These are the estimations that you have started but not yet completed. Negotiation is going on with the clients.'
                            count={data?.ongoingProjects} onClick={() => navigate('/estimations')} />

                    </Grid.Column>

                    <Grid.Column>

                        <DashboardCard iconName='check' colorName='green' cardHeader='Completed Projects'
                            cardDesc='These are the estimations that have been accepted.
                                    You can now start working on the projects.'
                            count={data?.completedProjects} onClick={() => navigate('/archive')} />

                    </Grid.Column>

                    <Grid.Column>


                        <DashboardCard iconName='close' colorName='red' cardHeader='Rejected Projects'

                            cardDesc='These are the estimations that have been rejected by the clients or by you.'
                            count={data?.rejectedProjects} onClick={() => navigate('/archive?type=1')} />


                    </Grid.Column>


                </Grid.Row>


            </Grid>

            <Grid className='ms-2' columns={2}>
                <Grid.Row>

                    <Grid.Column>
                        <Card fluid>

                            <Card.Content header='Requests' />
                            <Card.Content>
                                <GeneralChart userData={userData1}
                                    labelFieldName={'year'} dataFieldName={'userGain'}
                                    type={'BAR'} color={'rgba(53, 162, 235, 0.5)'}
                                />
                            </Card.Content>

                        </Card>
                    </Grid.Column>

                    <Grid.Column>
                        <Card fluid>

                            <Card.Content header='Estimations' />
                            <Card.Content>
                                <GeneralChart userData={userData1}
                                    labelFieldName={'year'} dataFieldName={'userGain'}
                                    type={'LINE'} color={'rgba(53, 162, 235, 0.5)'}
                                />
                            </Card.Content>

                        </Card>
                    </Grid.Column>

                </Grid.Row>
            </Grid>


        </div>
    );
}