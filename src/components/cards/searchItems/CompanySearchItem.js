import React from 'react'
import { List } from 'semantic-ui-react'

export const EmployeeSearchItem = ({ data }) => {
    return (
     
            <List.Item>

                <List.Icon name='briefcase' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header as='a'>
                        {data.name}

                    </List.Header>
                    <List.Description as='a'>
                        Company
                    </List.Description>
                </List.Content>
            </List.Item>
     
    )
}
