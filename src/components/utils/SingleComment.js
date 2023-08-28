import React, { useState, useRef } from 'react';
import { Button, Comment, Icon, Input, Loader, TextArea } from "semantic-ui-react";
import { regularApiRequest } from "../api/regularApiRequest";
import { base_url } from "../../index";
import { showToast } from "../../App";
import Textarea from "@mui/joy/Textarea";

import { useSelector, useDispatch } from "react-redux";
import { updateComments } from '../../actions';
import { commentApiRequest } from '../api/commentApiRequest';

const SingleComment = ({ singleCommentData }) => {

    const dispatch = useDispatch()
    const globalComments = useSelector(state => state.comments)

    const [commentPosting, setCommentPosting] = useState(false)


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

    const [isReplying, setIsReplying] = useState(false)
    // const replyRef = useRef('')

    const [newReply, setNewReply] = useState('')
    const addReply = async () => {

        // check if reply is empty
        if (newReply.length === 0) {
            showToast('Reply cannot be empty', 'error')
            return
        }

        const replyBody = {
            body: newReply
        }

        console.log('replyBody', replyBody)


        setCommentPosting(true)
        const response = await commentApiRequest({
            url: base_url + `comment/${singleCommentData.id}/reply`,
            method: 'POST',
            reqBody: replyBody
        })

        

        if (response && response.status === 200) {
            showToast('reply added successfully', 'success')
            setNewReply('')
            setIsReplying(false)
            setCommentPosting(false)

            // add the reply to the current comment in the current reply in the global comments
            // add the reply to the current reply in the global comments
            dispatch(updateComments(globalComments.map((currComment) => {
               
                if (currComment.id === singleCommentData.id) {
                   return { ...currComment, replies: [...currComment.replies, response.data.reply] }
                }
                // check the replies of the current comment
                // if the current comment has replies
                // check if the current reply is a reply to any of the replies
                // if it is, add it to the replies of the reply
                // if it is not, add it to the replies of the comment
                if (currComment.replies && currComment.replies.length > 0) {
                    return { ...currComment, replies: currComment.replies.map((currReply) => {
                        if (currReply.id === singleCommentData.id) {
                            return { ...currReply, replies: [...currReply.replies, response.data.reply] }
                        }
                        return currReply
                    })}
                }
                

                return currComment
            })))





            // dispatch(updateComments(globalComments.map((currComment) => {
            //     if (currComment.id === singleCommentData.id) {
            
            //         return { ...currComment, replies: [...currComment.replies, response.data.reply] }
            //     }
            //     return currComment
            // })))

            console.log('reply response', response)

        } else {
            showToast('Comment could not be added', 'error')
        }

    }


    return (

        <Comment>
            <Comment.Avatar src={singleCommentData.User.profile_picture || 'https://react.semantic-ui.com/images/avatar/small/matt.jpg'} />
            <Comment.Content>
                <Comment.Author as='a'>{singleCommentData.User.name}</Comment.Author>
                <Comment.Metadata>
                    <div>{getTimeOrDayDifference(singleCommentData.createdAt)}</div>
                </Comment.Metadata>
                <Comment.Text>{singleCommentData.body}</Comment.Text>

                {!isReplying &&
                    <Comment.Actions>
                        <a onClick={() => setIsReplying(true)}>Reply</a>
                    </Comment.Actions>
                }

                {isReplying && <span>


                    <Textarea size="md" name='newReply' value={newReply} onChange={(e) => { setNewReply(e.target.value) }} placeholder='add a comment...' />


                    {commentPosting ? <Loader className='mt-2' active size='small' inline /> :
                        <Button className='mt-3' onClick={addReply} primary>
                            <Icon name='send' /> Reply
                        </Button>
                    }
                </span>}


            </Comment.Content>

            {singleCommentData.replies &&
                <Comment.Group>
                    {singleCommentData.replies?.map((currReply, index) => {
                        return (

                            <SingleComment key={index} singleCommentData={currReply} />

                        )
                    })
                    }
                </Comment.Group>
            }


        </Comment>

    );
};

export default SingleComment;