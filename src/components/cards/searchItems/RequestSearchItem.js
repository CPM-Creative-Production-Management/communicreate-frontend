import React from 'react'
import { List } from 'semantic-ui-react'

export const RequestSearchItem = ({ data }) => {
    return (
     
            <List.Item>

                <List.Icon name='fork' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header>
                        {data.name}

                    </List.Header>
                    <List.Description as='a'>
                        Request
                    </List.Description>
                </List.Content>
            </List.Item>
     
    )
}
