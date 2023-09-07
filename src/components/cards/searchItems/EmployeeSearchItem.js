import React from 'react'
import { Rating } from 'react-simple-star-rating'
import { List } from 'semantic-ui-react'

export const EmployeeSearchItem = ({ data }) => {
    return (
     
            <List.Item>

                <List.Icon name='desktop' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header as='a'>
                        {data.name}

                    </List.Header>
                    <List.Description as='a'>
                        Employee
                        <div style={{ float: 'right' }}>
                        <Rating initialValue={data.rating} readonly allowFraction size={25} />
                        </div>
                    </List.Description>
                </List.Content>
            </List.Item>
     
    )
}
