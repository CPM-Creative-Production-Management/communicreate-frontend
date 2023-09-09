import React, { useEffect } from 'react'
import { SingleEstimationCard } from '../SingleEstimationCard'
import SingleReqCard from '../SingleReqCard'
import TableEmpList from '../../utils/TableEmpList'
import { Grid } from 'semantic-ui-react'
import AgencyCard from '../AgencyCard'
import not_found from '../../../assets/not_found.json'
import { LoadAnimation } from '../../utils/LoadAnimation'


const AgencySearchList = ({ searchData }) => {
  useEffect(() => {
    console.log(searchData)
  }, [])
  return (
    <div>
      {searchData.length === 0 ?

        <LoadAnimation animData={not_found} />

        :

        <Grid columns={4}>
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
      }
    </div>
  )
}

export default AgencySearchList