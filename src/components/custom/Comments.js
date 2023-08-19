import React, {useEffect} from 'react'
import {Button, Comment, Form, Header} from 'semantic-ui-react'
import {useApiRequest} from "../api/useApiRequest";
import {base_url} from "../../index";
import SingleComment from "../utils/SingleComment";

const Comments = ({estimationId}) => {

    const {data: commentsData, dataLoading, error} = useApiRequest({
        url: `${base_url}estimation/${estimationId}/comment`,
        method: 'GET',
    })

    useEffect(() => {
        console.log('comments ', commentsData)
    }, [commentsData]);


    return (
        <Comment.Group threaded>
            <Header as='h3' dividing>
                Comments
            </Header>

            {commentsData?.map((currComment, index) => {
                return (
                    <SingleComment key={index} singleCommentData={currComment}/>
                )
            })
            }


        </Comment.Group>
    )
}

export default Comments