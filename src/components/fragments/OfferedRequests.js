import React, { useEffect } from 'react';
import SingleReqCard from "../cards/SingleReqCard";
import {base_url} from "../../index";
import {useApiRequest} from "../api/useApiRequest";
import { regularApiRequest } from '../api/regularApiRequest';
import {Divider, Pagination} from "semantic-ui-react";
import { useDispatch, useSelector } from 'react-redux';
import { updateRequests } from '../../actions';

export const OfferedRequests = ({isOffered, isAccepted}) => {

    const dispatch = useDispatch()
    const globalRequests = useSelector(state => state.requests)
    let urlSuffix 

    const {data, dataLoading, error} = useApiRequest({
        url: `${base_url}${isOffered ? 'request/pending?page=1' : 'request/accepted?page=1'}`,
        method: 'GET',
    })
    
    useEffect(() => {
        if (data) {
            dispatch(updateRequests(data.requests))
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

            <Pagination defaultActivePage={1} totalPages={data?.totalPages} onPageChange={async (e) => {
                // make a request to the backend to get the new data
                // update the redux store
                // update the UI
                urlSuffix = `${isOffered ? 'request/pending?page=' : 'request/accepted?page='}${e.target.text}`
                console.log('urlSuffix', urlSuffix)
                const {data, dataLoading, error} = await regularApiRequest({
                    url: `${base_url}${urlSuffix}`,
                    method: 'GET',
                })
                if (data) {
                    dispatch(updateRequests(data.requests))
                }
            }} />
        </div>
    );
}