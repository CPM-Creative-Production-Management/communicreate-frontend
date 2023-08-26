import React, {useEffect} from 'react';
import SingleReqCard from "../cards/SingleReqCard";
import {base_url} from "../../index";
import {useApiRequest} from "../api/useApiRequest";
import {Divider} from "semantic-ui-react";
import {SingleEstimationCard} from "../cards/SingleEstimationCard";

export const Estimations = ({isOngoing, isRejected}) => {
    let urlSuffix

    useEffect(() => {
        // todo: rejected url fix
        urlSuffix = isOngoing ? 'request/finalized' : 'estimation/rejected'
    }, [])

    const {data, dataLoading, error} = useApiRequest({
        url: `${base_url}${isOngoing ? 'request/finalized' : 'estimation/rejected'}`,
        method: 'GET',
    })

    useEffect(() => {
        console.log("estimation data : ", data)
    }, [data])





return (
    <div>

        {data?.map((currEstimation, index) => {
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


    </div>
);
}