import React from 'react'
import { Comment, Icon } from 'semantic-ui-react';

const SingleNotification = ({ singleNotification }) => {

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
                    return `${hoursDifference} hour${hoursDifference > 1 && 's'} ago`;
                }
            } else if (daysDifference === 1) {
                return `1 day ago`;
            } else {
                return `${daysDifference} day${daysDifference > 1 && 's'} ago`;
            }
        } else {
            const year = targetTime.getUTCFullYear();
            const month = (targetTime.getUTCMonth() + 1).toString().padStart(2, '0');
            const day = targetTime.getUTCDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    }


    const trimMessage = (message) => {
        if (message.length > 70) {
            return message.slice(0, 70) + '...'
        }
        return message
    }

    return (
     
            <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg' />
           

            <Comment.Content> 
            <Comment.Author as='a'>{trimMessage(singleNotification.message)}</Comment.Author>
               <br/><Comment.Metadata >
                    <div>{getTimeOrDayDifference(singleNotification.createdAt)}</div>
                </Comment.Metadata>
                </Comment.Content>
            </Comment>

   
    )
}

export default SingleNotification