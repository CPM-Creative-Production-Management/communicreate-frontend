import React from 'react'
import AgencyCard from '../../cards/AgencyCard'
import { Grid } from 'semantic-ui-react'
import { useApiRequest } from '../../api/useApiRequest'
import { base_url } from '../../..'
import { CircularProgress } from '@mui/material';

const AgencyPage = () => {
    const {data: agencyData, dataLoading: agencyDataLoading, error} = useApiRequest({
        url: base_url + 'agency',
        method: 'GET'
    })

  return (
    <div>
        { agencyDataLoading ? <center><CircularProgress /></center>: <Grid className='ms-3' columns={5}>
            <Grid.Row>
                {agencyData?.map((agency) => {
                    return (
                        <Grid.Column>
                            <AgencyCard 
                            name={agency.name} 
                            address={agency.address} 
                            details={agency.details} 
                            website={agency.website} 
                            tags={agency.Tags}    
                            />
                        </Grid.Column>
                    )
                })}
                
            </Grid.Row>
        </Grid>}
    </div>
  )
}

export default AgencyPage