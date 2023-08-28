import React, {useEffect} from 'react'
import {Button, Comment, Form, Header, Input} from 'semantic-ui-react'
import {useApiRequest} from "../api/useApiRequest";
import {base_url} from "../../index";
import SingleComment from "../utils/SingleComment";

import {useSelector, useDispatch} from "react-redux";
import { updateComments } from '../../actions';

const Comments = ({estimationId}) => {

    const dispatch = useDispatch()
    const globalComments = useSelector(state => state.comments)

    const {data: commentsData, dataLoading, error} = useApiRequest({
        url: `${base_url}estimation/${estimationId}/comment`,
        method: 'GET',
    })

    useEffect(() => {
        console.log('comments ', commentsData)
        dispatch(updateComments(commentsData))
    }, [dataLoading]);


    return (
        <div>


            {globalComments?.map((currComment, index) => {
                return (
                    <SingleComment key={index} singleCommentData={currComment}/>
                )
            })
            }



        </div>

    )
}

export default Comments