import React from 'react'
import { List } from 'semantic-ui-react'

const AgencySearchItem = ({ data }) => {
    return (
     
            <List.Item>

                <List.Icon name='lightbulb outline' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header as='a'>
                        {data.name}

                    </List.Header>
                    <List.Description as='a'>
                        Agency
                        <div style={{ float: 'right' }}>
                        {data.email}
                        </div>
                    </List.Description>
                </List.Content>
            </List.Item>
     
    )
}

export default AgencySearchItem