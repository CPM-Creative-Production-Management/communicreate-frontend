import React from 'react';
import SingleReqCard from "../cards/SingleReqCard";
import {base_url} from "../../index";
import {useApiRequest} from "../api/useApiRequest";
import {Divider} from "semantic-ui-react";

export const OfferedRequests = () => {
    // map kore majhe Divider diye dibo
    const {data, dataLoading, error} = useApiRequest({
        url: base_url + 'request/pending',
        method: 'GET',
    })


    return (
        <div>

            {data?.map((currReq, index) => {
                    return (
                        <div>
                            <SingleReqCard
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