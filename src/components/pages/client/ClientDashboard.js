import React from 'react'
import { DashboardCard } from '../../cards/DashboardCard'
import { Grid } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'

const ClientDashboard = () => {
  let navigate = useNavigate()

  return (
    <div>
      <br />
      <Grid className='ms-2' columns={5}>
                <Grid.Row>
                    <Grid.Column>
                        <DashboardCard iconName='wait' colorName='blue' cardHeader='Requests'
                                       count='10' entity='Requests'/>

                    </Grid.Column>

                    <Grid.Column>
                        <DashboardCard iconName='mail' colorName='yellow' cardHeader='Responses'
                                       count='10' entity='Responses'/>
                    </Grid.Column>

                    <Grid.Column>

                        <DashboardCard iconName='circle notch' colorName='teal' cardHeader='Ongoing Negotiations'
                                       count='5' entity='Negotiations'/>

                    </Grid.Column>

                    <Grid.Column>


                        <DashboardCard iconName='check' colorName='green' cardHeader='Completed Projects'
                                       count='2' entity='Projects'/>

                    </Grid.Column>

                    <Grid.Column>
                    <DashboardCard iconName='cancel' colorName='red' cardHeader='Rejected Projects'
                                       count='2' entity='Projects'/>
                    </Grid.Column>
                </Grid.Row>
            </Grid>

    </div>
  )
}

export default ClientDashboard