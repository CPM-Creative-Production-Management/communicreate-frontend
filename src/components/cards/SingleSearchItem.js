import React from 'react'
import { Card, Divider, Label, List } from 'semantic-ui-react'

import { RequestSearchItem } from './searchItems/RequestSearchItem'
import AgencySearchItem from './searchItems/AgencySearchItem'
import { EstimationSearchItem } from './searchItems/EstimationSearchItem'
import { EmployeeSearchItem } from './searchItems/EmployeeSearchItem'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import './card.css'


const SingleSearchItem = ({ data, type, closeModal }) => {
    const navigate = useNavigate()
    return (

        <List onClick={()=>{
            closeModal(`${data.url}`)
            // navigate(`${data.url}`)
            }}  className='ps-3 pe-3 pt-2 pb-2 element' divided relaxed>
            
            {type === 'agency' &&
                <AgencySearchItem data={data} />
            }


            {/* {type === 'request' &&
                <RequestSearchItem data={data} />
            } */}

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