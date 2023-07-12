import React from 'react';
import {Card, Grid, Icon} from "semantic-ui-react";
import toast from "react-hot-toast";

import '../../global.css'
import {DashboardCard} from "../cards/DashboardCard";

export const Dashboard = () => {

    return (
        <div>

            <br/>

            <Grid className='ms-2' columns={4}>
                <Grid.Row>
                    <Grid.Column>
                        <DashboardCard iconName='play' colorName='teal' cardHeader='Unfinished Estimations'
                                       cardDesc='These are the estimations that you have started but not yet completed. Negotiation is going on with the clients.'
                                       count='5'/>

                    </Grid.Column>

                    <Grid.Column>

                        <DashboardCard iconName='check' colorName='green' cardHeader='Finalized Estimations'
                                       cardDesc='These are the estimations that have been accepted.
                                    You can now start working on the projects.'
                                       count='3'/>

                    </Grid.Column>

                    <Grid.Column>


                        <DashboardCard iconName='close' colorName='red' cardHeader='Rejected Estimations'

                                       cardDesc='These are the estimations that have been rejected by the clients or by you.'
                                       count='2'/>


                    </Grid.Column>

                    <Grid.Column></Grid.Column>
                </Grid.Row>
            </Grid>


        </div>
    );
}