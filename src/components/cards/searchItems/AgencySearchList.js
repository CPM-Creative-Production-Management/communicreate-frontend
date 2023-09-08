import React, { useEffect } from 'react'
import { SingleEstimationCard } from '../SingleEstimationCard'
import SingleReqCard from '../SingleReqCard'
import TableEmpList from '../../utils/TableEmpList'
import { Grid } from 'semantic-ui-react'
import AgencyCard from '../AgencyCard'

const AgencySearchList = ({ searchData }) => {
  useEffect(() => {
    console.log(searchData)
  }, [])
  return (
    <div>

      <Grid className='ms-3' columns={5}>
        {searchData?.map((agency) => {
          return (
            <>
              <Grid.Column key={agency.id}>
                <AgencyCard
                  name={agency.name}
                  address={agency.address}
                  details={agency.details}
                  website={agency.website}
                  tags={agency.Tags}
                  id={agency.id}
                  logo={agency.logo}
                />
              </Grid.Column>
            </>
          )
        })}
      </Grid>
    </div>
  )
}

export default AgencySearchList