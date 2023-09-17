import React from 'react'
import { Comment, Icon, Label } from 'semantic-ui-react';
import './card.css'
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SingleNotification = ({ singleNotification }) => {

    const navigate = useNavigate()
    const getTimeOrDayDifference = (dateString) => {
        const currentTime = new Date();
        const targetTime = new Date(dateString);

        const timeDifference = currentTime - targetTime;
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference <= 7) {
            if (daysDifference < 1) {
                if (hoursDifference < 1) {
                    if (timeDifference / (1000 * 60) < 1) {
                        return `just now`;
                    }
                    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
                    return `${minutesDifference} minute${minutesDifference > 1 ? 's' : ''} ago`;
                } else {
                    return `${hoursDifference} hour${hoursDifference > 1 ? 's' : ''} ago`;
                }
            } else if (daysDifference === 1) {
                return `1 day ago`;
            } else {
                return `${daysDifference} day${daysDifference > 1 ? 's' : ''} ago`;
            }
        } else {
            const year = targetTime.getUTCFullYear();
            const month = (targetTime.getUTCMonth() + 1).toString().padStart(2, '0');
            const day = targetTime.getUTCDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    }


    const trimMessage = (message) => {
        if (message.length > 60) {
            return message.slice(0, 60) + '...'
        }
        return message
    }

    return (
        <div className='element p-3' onClick={()=>{navigate(singleNotification.link)}} style={{ cursor: 'pointer' }} >


            {singleNotification.read ? null
                : <Label as='a' color='red' ribbon>
                    New
                </Label>}
            <Comment>

                {singleNotification.type === 'comment' && <Icon name='comments outline' />}
                {singleNotification.type === 'estimation' && <Icon name='calculator' />}
                {singleNotification.type === 'request' && <Icon name='fork' />}
                {singleNotification.type === 'payment' && <Icon name='money bill alternate outline' />}


                
                <Typography as='h5' variant="bold"> {singleNotification.message}</Typography>
               

                <div>{getTimeOrDayDifference(singleNotification.createdAt)}</div>



            </Comment>
        </div>


    )
}

export default SingleNotification