import React from 'react'
import { Card, Divider, Label, List } from 'semantic-ui-react'

import { RequestSearchItem } from './searchItems/RequestSearchItem'
import AgencySearchItem from './searchItems/AgencySearchItem'
import { EstimationSearchItem } from './searchItems/EstimationSearchItem'
import { EmployeeSearchItem } from './searchItems/EmployeeSearchItem'


const SingleSearchItem = ({ data, type }) => {
    return (

        <List className='ms-2 me-2 mb-4' divided relaxed>
            {type === 'agency' &&
                <AgencySearchItem data={data} />
            }

{type === 'company' &&
                <EmployeeSearchItem data={data} />
            }

            {type === 'request' &&
                <RequestSearchItem data={data} />
            }

            {type === 'estimation' &&
                <EstimationSearchItem data={data} />
            }

            {type === 'employee' &&
                <EmployeeSearchItem data={data} />
            }

            {/* <Divider /> */}



        </List>


    )
}

export default SingleSearchItem