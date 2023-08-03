import React from 'react';
import {useApiRequest} from "../api/useApiRequest";
import {base_url} from "../../index";

export const EstimationsOngoing = () => {
    

    const {data, loading, error} = useApiRequest({
        url: base_url + 'estimation/ongoing',
        method: 'GET'
    })

    return (
        <div>
            <br/>
            <center>
                <h3>Ongoing Estimations </h3>
            </center>

            <div>
                {loading? <div>loading...</div> : JSON.stringify(data)}

            </div>


        </div>
    );
}