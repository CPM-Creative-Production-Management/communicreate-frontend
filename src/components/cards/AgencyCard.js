import React from 'react'
import { Card, Icon, Image, Label } from 'semantic-ui-react'

const AgencyCard = ({name, address, details, website, tags}) => {

    const colors = ['teal', 'orange', 'blue']

    const generateRandomColor = () => {
        const index = Math.floor(Math.random() * 3)
        return colors[index]
    }

  return (
    <div>
        <Card link fluid>
        <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
            <Card.Content>
                <Card.Header>
                    {name}
                </Card.Header>
                <Card.Meta>
                    {details}
                </Card.Meta>
                <Card.Description>
                    {address}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <a>
                    <Icon name='linkify' />
                    {website}
                </a>
            </Card.Content>
            <Card.Content extra>
                <div>
                    <Icon name='tags' />
                    {tags.slice(0, 2).map((tag, index) => (
                        <Label className='ms-2' as='a' color={colors[index % 3]}>{tag.tag}</Label>
                    ))}

                </div>
            </Card.Content>
            
        </Card>
    </div>
  )
}

export default AgencyCard