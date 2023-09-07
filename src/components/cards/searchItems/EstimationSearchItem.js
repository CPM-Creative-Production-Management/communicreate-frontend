import React from 'react'
import { Label, List } from 'semantic-ui-react'

export const EstimationSearchItem = ({ data }) => {
    return (
     
            <List.Item>

                <List.Icon name='calculator' size='large' verticalAlign='middle' />
                <List.Content>
                    <List.Header as='a'>
                        {data.ReqAgency.Request.name}

                    </List.Header>
                    <List.Description as='a'>
                        Estimation
                        <div style={{ float: 'right' }}>
                        {data.ReqAgency.Company.name}
                        </div>
                    </List.Description>
                </List.Content>
            </List.Item>
     
    )
}
