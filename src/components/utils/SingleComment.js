import React from 'react';
import {Comment} from "semantic-ui-react";

const SingleComment = ({singleCommentData}) => {

    const splitDate = (date) => {
        return date.split('T')[0]
    }

    const getTimeOrDayDifference = (dateString) => {
        const currentTime = new Date();
        const targetTime = new Date(dateString);

        const timeDifference = currentTime - targetTime;
        const hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference <= 7) {
            if (daysDifference < 1) {
                if (hoursDifference < 1) {
                    const minutesDifference = Math.floor(timeDifference / (1000 * 60));
                    return `${minutesDifference} minutes ago`;
                } else {
                    return `${hoursDifference} hours ago`;
                }
            } else if (daysDifference === 1) {
                return `1 day ago`;
            } else {
                return `${daysDifference} days ago`;
            }
        } else {
            const year = targetTime.getUTCFullYear();
            const month = (targetTime.getUTCMonth() + 1).toString().padStart(2, '0');
            const day = targetTime.getUTCDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    }


    return (

        <Comment>
            <Comment.Avatar src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>
            <Comment.Content>
                <Comment.Author as='a'>{singleCommentData.User.name}</Comment.Author>
                <Comment.Metadata>
                    <div>{getTimeOrDayDifference(singleCommentData.createdAt)}</div>
                </Comment.Metadata>
                <Comment.Text>{singleCommentData.body}</Comment.Text>
                <Comment.Actions>
                    <a>Reply</a>
                </Comment.Actions>
            </Comment.Content>

            <Comment.Group>
                {singleCommentData.replies?.map((currReply, index) => {
                    return (

                        <SingleComment key={index} singleCommentData={currReply}/>

                    )
                })
                }
            </Comment.Group>


        </Comment>

    );
};

export default SingleComment;