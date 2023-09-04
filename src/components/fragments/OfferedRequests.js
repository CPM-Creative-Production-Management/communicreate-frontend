import React, { useEffect } from 'react';
import SingleReqCard from "../cards/SingleReqCard";
import {base_url} from "../../index";
import {useApiRequest} from "../api/useApiRequest";
import {Divider} from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import { updateRequests } from '../../actions';

export const OfferedRequests = ({isOffered, isAccepted}) => {
    const dispatch = useDispatch()
    const globalRequests = useSelector(state => state.requests)
    let urlSuffix 

    useEffect(() => {
        urlSuffix = isOffered ? 'request/pending' : 'request/accepted'
    }, [])

    const {data, dataLoading, error} = useApiRequest({
        url: `${base_url}${isOffered ? 'request/pending' : 'request/accepted'}`,
        method: 'GET',
    })
    
    useEffect(() => {
        if (data) {
            dispatch(updateRequests(data))
        }
    }, [dataLoading])

    useEffect(() => {
        console.log('globalRequests', globalRequests)
    }, [globalRequests])

    return (
        <div>

            {globalRequests?.map((currReq, index) => {
                    return (
                        <div>
                            <SingleReqCard isOffered={isOffered} isAccepted={isAccepted}
                                key={index}
                                reqData={currReq}
                            />
                            <br/>
                        </div>
                    )
                }
            )}


        </div>
    );
}