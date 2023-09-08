import React, { useEffect, useRef, useState } from 'react'
import { Button, Comment, Form, Header, Input } from 'semantic-ui-react'
import { useApiRequest } from "../api/useApiRequest";
import { base_url } from "../../index";
import SingleComment from "../utils/SingleComment";

import { useSelector, useDispatch } from "react-redux";
import { updateComments } from '../../actions';

import lottie from 'lottie-web';
import comments_loading from '../../assets/comments_loading.json'
import { commentApiRequest } from '../api/commentApiRequest';
import axios from 'axios';
import { showToast } from '../../App';

import Cookies from "universal-cookie";
import { LoadAnimation } from '../utils/LoadAnimation';


// function CommentsLoadingAnim() {
//     const animationContainer = useRef(null);

//     useEffect(() => {
//         // Load the Lottie animation
//         const anim = lottie.loadAnimation({
//             container: animationContainer.current,
//             animationData: comments_loading,
//             renderer: 'svg', // Choose the renderer ('svg', 'canvas', 'html')
//             loop: true,
//             autoplay: true,
//         });

//         // Clean up animation resources when the component unmounts
//         return () => anim.destroy();
//     }, []);

//     return (
//         <div
//             ref={animationContainer}
//             style={{ width: '300px', height: '300px' }}
//         />
//     );
// }

const Comments = ({ estimationId }) => {

    const dispatch = useDispatch()
    const globalComments = useSelector(state => state.comments)

    const [dataLoading, setDataLoading] = useState(true)
    const cookies = new Cookies();



    useEffect(() => {
        setDataLoading(true)
        const requestHeaders = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${cookies.get("token")}`
        }

        axios.get(`${base_url}estimation/${estimationId}/comment`, {headers: requestHeaders}).then((response) => {
            console.log('comments ', response.data)
            dispatch(updateComments(response.data))

        }).catch((error) => {
            showToast('Error fetching comments', 'error')
            console.log(error)
        }).finally(() => {
            setDataLoading(false)
        })

    }, [])




    return (
        <div>

            {dataLoading ? <LoadAnimation animData={comments_loading} /> :


                globalComments?.map((currComment, index) => {
                    return (
                        <SingleComment key={index} singleCommentData={currComment} />
                    )
                })

            }



        </div>

    )
}

export default Comments