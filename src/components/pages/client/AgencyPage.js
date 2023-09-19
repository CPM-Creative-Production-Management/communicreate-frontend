import React from 'react'
import { useParams } from 'react-router-dom'
import { useApiRequest } from '../../api/useApiRequest'
import { base_url } from '../../..'
import { Rating } from 'react-simple-star-rating'
import { Button, Card, Divider, Grid, Icon, Image, Input, Label, Message, Segment } from 'semantic-ui-react'
import { Stack } from '@mui/material'
import ReviewCard from '../../cards/ReviewCard'
import ProfileBg from '../../../assets/profile-bg.jpg'
import { SingleEstimationCard } from '../../cards/SingleEstimationCard'
import '../pages.css'

const AgencyPage = () => {
    const { id } = useParams()
    const colors = ['teal', 'orange', 'blue']

    const {data: agencyData, dataLoading: agencyDataLoading, error} = useApiRequest({
        url: base_url + 'agency/' + id + '/details',
        method: 'GET'
    })

  return (
    <div>
    <img alt='cover' className='cover-img' src={ProfileBg} />
        { agencyData && <div className='profile-cards'>

            <Grid columns={2}>

                
                <Grid.Column width={15}>
                    <div className='profile-card'>
                        <div className='profile-card-content'>
                            <center><h2>{agencyData.name}</h2></center>
                            
                            {/* <p>Change your profile picture, name, email, and more.</p> */}
                            <Divider />


                            <h3>Details</h3>
                            <center>
                                <Image circular className='profile-img'
                                    src={agencyData.logo}
                                    alt="Selected Image"
                                    style={{ width: '150px', height: '150px' }}
                                /> 
                            </center>
                            <br />

                            <br />




                            <Stack direction="column" spacing={2}>
                                <Stack direction="row" spacing={2}>
                                <Icon name='mail' />
                                <h4>{agencyData.email}</h4>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                <Icon name='phone' />
                                <h4>{agencyData.phone}</h4>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                <Icon name='map marker alternate' />
                                <h4>{agencyData.address}</h4>
                                </Stack>
                                <Stack direction="row" spacing={2}>
                                <Icon name='linkify' />
                                <a style={{cursor: "pointer"}} href={agencyData.website} target='_blank'> {agencyData.website}</a>
                                </Stack>
                                {/* <Input ref={passwordRef} fluid icon='lock' iconPosition='left' placeholder='Password' />
                                <Input ref={confirmPasswordRef} fluid icon='lock' iconPosition='left' placeholder='Confirm Password' /> */}

                                <Divider />

                                <h3>Tags</h3>
                                <Stack direction="row" spacing={2}>
                                    {
                                        agencyData.Tags?.map((tag, index) => {
                                            return (
                                                <Label color={colors[index % 3]}>
                                                    <Icon name='tag' />{tag.tag}</Label>
                                            )
                                        })
                                    }
                                </Stack>

                                <h3>Recent Projects with {agencyData.name}</h3>
                                <br />
                                <Stack direction="column" spacing={2}>
                                    {
                                        agencyData.ReqAgencies?.map((reqAgency) => {
                                            return (
                                                <Segment raised>
                                                    {
                                                        reqAgency.Estimation.is_completed &&
                                                            <Label as='a' color="green" ribbon>
                                                                Complete
                                                            </Label>
                                                    }

                                                    {
                                                        reqAgency.Estimation.is_rejected && 
                                                        <Label as='a' color="red" ribbon>
                                                            Rejected
                                                        </Label>
                                                    }

                                                    {
                                                        (!reqAgency.Estimation.is_rejected && !reqAgency.Estimation.is_completed) && 
                                                        <Label as='a' color="blue" ribbon>
                                                            Ongoing
                                                        </Label>
                                                    }
                                                    <SingleEstimationCard 
                                                    key={reqAgency.id}
                                                    estimationData={reqAgency}
                                                    isOngoing={!reqAgency.Estimation.is_completed}
                                                    isRejected={false}
                                                    isArchived={true}
                                                    />
                                                </Segment>
                                                
                                            )
                                        })
                                    }
                                </Stack>
                                <Divider />

                                <h3>Reviews</h3>

                                {/* <Button loading={uploadingImg} onClick={handleSaveChanges} color='blue' className='mt-3'>Save Changes</Button> */}
                                <Stack direction="column" spacing={2}>
                                    {
                                        agencyData.Reviews?.map((review) => {
                                            return (
                                                <ReviewCard 
                                                    companyName={review.Company.name} 
                                                    title={review.title} 
                                                    text={review.description}
                                                    companyLogo={review.Company.logo}
                                                    rating={review.rating}
                                                    key={review.id}
                                                />
                                            )
                                        })
                                    }   
                                </Stack>

                            </Stack>



                        </div>

                    </div>

                </Grid.Column>
            </Grid>
        </div>}
</div>
  )
}

export default AgencyPage