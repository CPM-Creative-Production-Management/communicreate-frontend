import React from 'react'
import { useParams } from 'react-router-dom'
import { useApiRequest } from '../../api/useApiRequest'
import { base_url } from '../../..'
import { Container, Image, Icon, Card, Label } from 'semantic-ui-react'
import { Rating } from 'react-simple-star-rating'

const AgencyPage = () => {
    const { id } = useParams()

    const containerStyle = {
        display: 'inline-flex', 
        alignItems: 'center',
    }

    const {data: agencyData, dataLoading: agencyDataLoading, error} = useApiRequest({
        url: base_url + 'agency/' + id + '/details',
        method: 'GET'
    })

  return (
    <div>
        <Card className='p-4' fluid>
        <div style={containerStyle}>
                <Image src={agencyData?.logo} size='small' circular/>
                <h1 className='ms-3'>{agencyData?.name}</h1>
        </div>
        <div style={containerStyle} className='mt-3'>
            <Icon name='mail' size='3' /> <a className='ms-3'>{agencyData?.email}</a>
        </div>
        <div style={containerStyle} className='mt-3'>
            <Icon name='address card' /> <h4 className='ms-3'>{agencyData?.address}</h4>
        </div>
        <div style={containerStyle} className='mt-3'>
            <Icon name='phone' size='3' /> <h className='ms-3'>{agencyData?.phone}</h>
        </div>
            <a className='mt-3'>{agencyData?.website}</a>
        <div style={containerStyle} className='mt-3'>
            <Icon name='tags' />
            {agencyData?.Tags?.map((tag, index) => (
                <Label className='ms-2' as='a' color='teal' key={index}>{tag.tag}</Label>
            ))}

        </div>

        
        </Card>

        <Card className='p-4 mt-3' fluid>
            <Card.Header className='p-4'>
                <center>
                <h3>Reviews</h3>
                </center>
            </Card.Header>

            <Card.Content className='p-4'>
                {agencyData?.Reviews?.map((review, index) => (
                    <Card fluid key={index} className='p-4'>
                        <Card.Header className='p-4'>
                            <h3>{review.Company.name}</h3>
                            <Rating initialValue={review.rating} readonly />
                        </Card.Header>
                        <Card.Content>
                            <h2>{review.title}</h2>
                            <p>{review.description}</p>
                        </Card.Content>
                    </Card>
                ))}
            </Card.Content>
        </Card>
    </div>
  )
}

export default AgencyPage