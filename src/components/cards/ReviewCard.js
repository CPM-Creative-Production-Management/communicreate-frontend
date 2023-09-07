import { Card } from "semantic-ui-react";
import { Rating } from 'react-simple-star-rating'
import Stack from '@mui/material/Stack';
import {Image} from "semantic-ui-react";
import React from 'react'

const ReviewCard = ({title, companyName, text, companyLogo, rating}) => {
  return (
    <div>
        <Card fluid className="p-4">
            <Card.Content>

                <Card fluid className="p-4">
                    <Card.Content>
                        <Stack direction="column" spacing={3}>
                            <h2>{title}</h2>
                            <br/>
                            <p>{text}</p>
                        </Stack>
                        <br/>
                        <Stack direction={"row"} spacing={2}>
                        <Image circular className='profile-img'
                                            src={companyLogo}
                                            alt="Selected Image"
                                            style={{ width: '80px', height: '80px' }}
                            /> 
                            <div style={{padding: '10px 0'}}>
                                <Stack direction={"column"} spacing={1}>
                                    <h3 >{companyName}</h3>
                                    <Rating size={30} readonly initialValue={rating} allowFraction allowHover/>
                                </Stack>
                            </div>
                            
                        </Stack>
                    </Card.Content>
                </Card>                
            </Card.Content>
            
        </Card>
    </div>
  )
}

export default ReviewCard