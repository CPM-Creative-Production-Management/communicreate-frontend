import React, { useEffect } from 'react';
import SingleReqCard from "../cards/SingleReqCard";
import {base_url} from "../../index";
import {useApiRequest} from "../api/useApiRequest";
import {Divider} from "semantic-ui-react";

export const OfferedRequests = ({isOffered, isAccepted}) => {
    let urlSuffix 

    useEffect(() => {
        urlSuffix = isOffered ? 'request/pending' : 'request/accepted'
    }, [])

    const {data, dataLoading, error} = useApiRequest({
        url: `${base_url}${isOffered ? 'request/pending' : 'request/accepted'}`,
        method: 'GET',
    })


    return (
        <div>

            {data?.map((currReq, index) => {
                    return (
                        <div>
                            <SingleReqCard isOffered={isOffered} isAccepted={isAccepted}
                                key={currReq.id}
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