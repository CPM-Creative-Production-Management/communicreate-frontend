import React from 'react'
import { DashboardCard } from '../../cards/DashboardCard'
import { Grid } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import { useApiRequest } from '../../api/useApiRequest'
import { base_url } from '../../..'

const ClientDashboard = () => {
  let navigate = useNavigate()

  const { data, dataLoading: requestsLoading, error } = useApiRequest({
    url: base_url + 'dashboard',
    method: 'GET',
  })

  return (
    <div>

      { data && <Grid className='ms-2' columns={4}>
        <Grid.Row>
            <Grid.Column>
                <DashboardCard iconName='wait' colorName='blue' cardHeader='Requests'
                                count={data?.requests} entity='Request' onClick={() => navigate('/my-requests')}/>

            </Grid.Column>

            <Grid.Column>

                <DashboardCard iconName='circle notch' colorName='teal' cardHeader='Ongoing Projects'
                                count={data?.ongoingProjects} entity='Project' onClick={() => navigate('/ongoing-projects')}/>

            </Grid.Column>

            <Grid.Column>
                <DashboardCard iconName='check' colorName='green' cardHeader='Completed Projects'
                                count={data?.completedProjects} entity='Project' onClick={() => navigate('/completed-projects')}/>

            </Grid.Column>

            <Grid.Column>
            <DashboardCard iconName='cancel' colorName='red' cardHeader='Rejected Projects'
                                count={data?.rejectedProjects} entity='Project' onClick={() => navigate('/rejected-projects')}/>
            </Grid.Column>
        </Grid.Row>
    </Grid>}

    </div>
  )
}

export default ClientDashboard