import React, {useEffect, useState} from 'react';
import SingleReqCard from "../cards/SingleReqCard";
import {base_url} from "../../index";
import {useApiRequest} from "../api/useApiRequest";
import {Divider, Pagination} from "semantic-ui-react";
import {SingleEstimationCard} from "../cards/SingleEstimationCard";
import { regularApiRequest } from '../api/regularApiRequest';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { updateRequests } from '../../actions';

export const Estimations = ({isOngoing, isRejected}) => {
    let urlSuffix
    const dispatch = useDispatch()
    const globalRequests = useSelector(state => state.requests)
    const [activePage, setActivePage] = useState(1)

    useEffect(() => {
        // todo: rejected url fix
        urlSuffix = isOngoing ? 'request/finalized/?page=1' : 'estimation/rejected/?page=1'
    }, [])

    const {data, dataLoading, error} = useApiRequest({
        url: `${base_url}${isOngoing ? 'request/finalized/?page=1' : 'estimation/rejected/?page=1'}`,
        method: 'GET',
    })

    useEffect(() => {
        if (data) {
            dispatch(updateRequests(data.requests))
        }
    }, [dataLoading])

return (
    <div>

        {globalRequests?.map((currEstimation, index) => {
                return (
                    <div>
                        <SingleEstimationCard isOngoing={isOngoing} isRejected={isRejected}
                            key={index}
                            estimationData={currEstimation}
                        />
                        <br/>
                    </div>
                )
            }
        )}

    <Pagination pointing secondary  firstItem={null}
        lastItem={null} defaultActivePage={1} totalPages={data? data.totalPages : 1} onPageChange={async (e) => {
            // make a request to the backend to get the new data
            // update the redux store
            // update the UI
            if (e.target.text === '⟨') {
                urlSuffix = `${isOngoing ? 'request/finalized?page=' : 'request/rejected?page='}` + (parseInt(activePage) - 1)
                setActivePage(activePage - 1)
            } else if (e.target.text === '⟩') {
                urlSuffix = `${isOngoing ? 'request/finalized?page=' : 'request/rejected?page='}` + (parseInt(activePage) + 1)
                setActivePage(activePage + 1)
            } else  {
                setActivePage(e.target.text)
                urlSuffix = `${isOngoing ? 'request/finalized?page=' : 'request/rejected?page='}` + parseInt(e.target.text)
            }
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