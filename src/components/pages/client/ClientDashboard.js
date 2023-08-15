import React from 'react'
import { DashboardCard } from '../../cards/DashboardCard'
import { Grid } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { useApiRequest } from '../../api/useApiRequest'
import { base_url } from '../../..'

const ClientDashboard = () => {
  let navigate = useNavigate()

  const { data: data, loading: requestsLoading, error } = useApiRequest({
    url: base_url + 'dashboard',
    method: 'GET',
  })

  return (
    <div>
      <br />
      { data && <Grid className='ms-2' columns={5}>
        <Grid.Row>
            <Grid.Column>
                <DashboardCard iconName='wait' colorName='blue' cardHeader='Requests'
                                count={data.requests} entity='Requests'/>

            </Grid.Column>

            <Grid.Column>
                <DashboardCard iconName='mail' colorName='yellow' cardHeader='Responses'
                                count={data.responses} entity='Responses'/>
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
    </Grid>}

    </div>
  )
}

export default ClientDashboard