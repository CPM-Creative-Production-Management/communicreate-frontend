import React from 'react';
import { Card, Divider, Grid, Icon, Message } from "semantic-ui-react";


import '../../global.css'
import { DashboardCard } from "../cards/DashboardCard";
import { useNavigate } from 'react-router-dom';
import { Button } from 'semantic-ui-react'
import GeneralChart from '../utils/GeneralChart'
import { useApiRequest } from '../api/useApiRequest';
import { base_url } from '../..';


export const Dashboard = () => {
    let navigate = useNavigate();

    const { data, dataLoading, error } = useApiRequest({
        url: base_url + 'dashboard',
        method: 'GET',
      })

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

    const userData2 = [
        {
            id: 1,
            year: 2016,
            userGain: 8000,
            userLost: 823,
        },
        {
            id: 2,
            year: 2017,
            userGain: 4677,
            userLost: 345,
        },
        {
            id: 3,
            year: 2018,
            userGain: 7888,
            userLost: 555,
        },
        {
            id: 4,
            year: 2019,
            userGain: 9000,
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
        <div className='ms-2'> 
            {/* <Button onClick={() => {
                        navigate("/add-estimation")
                    }} primary className='mt-3 fab' size='large' >Add new Estimation</Button> */}




            <Grid columns={5}>
                <Grid.Row>
                    <Grid.Column>
                        <DashboardCard iconName='forward' colorName='teal' cardHeader='Ongoing Estimations' url='estimations'
                            cardDesc='These are the estimations that you have started but not yet completed. Negotiation is going on with the clients.'
                            count={data?.ongoingProjects} />

                    </Grid.Column>

                    <Grid.Column>

                        <DashboardCard iconName='check' colorName='green' cardHeader='Finalized Estimations'
                            cardDesc='These are the estimations that have been accepted.
                                    You can now start working on the projects.'
                            count={data?.completedProjects} />

                    </Grid.Column>

                    <Grid.Column>


                        <DashboardCard iconName='close' colorName='red' cardHeader='Rejected Estimations'

                            cardDesc='These are the estimations that have been rejected by the clients or by you.'
                            count={data?.rejectedProjects} />


                    </Grid.Column>


                </Grid.Row>


            </Grid>



            <Grid columns={2}>
                <Grid.Row>

                    <Grid.Column width={5} >
                        <Card fluid>

                            <Card.Content header='Requests' />
                            <Card.Content>
                                <GeneralChart userData1={userData1}
                                    labelFieldName={'year'} dataFieldName={'userGain'}
                                    type={'DOUGHNUT'} color={'rgba(53, 162, 235, 0.5)'}
                                />
                            </Card.Content>

                        </Card>
                    </Grid.Column>

                    <Grid.Column width={9}>
                        <Card fluid>

                            <Card.Content header='Estimations' />
                            <Card.Content>
                                <GeneralChart userData1={userData1} userData2={userData2}
                                    labelFieldName={'year'} dataFieldName={'userGain'}
                                    type={'LINE'} color={'rgba(53, 162, 235, 0.5)'}
                                />
                            </Card.Content>

                        </Card>
                    </Grid.Column>

                </Grid.Row>

                <Grid.Row>

                <Grid.Column>
                        <Card fluid>

                            <Card.Content header='Estimations' />
                            <Card.Content>
                                <GeneralChart userData1={userData1}
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