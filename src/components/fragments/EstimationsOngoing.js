import React from 'react';
import {usePublicGetReq} from "../api/usePublicGetReq";
import {base_url} from "../../index";
import Cookies from "universal-cookie";

export const EstimationsOngoing = () => {
    const cookies = new Cookies();

    const requestHeaders = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${cookies.get("token")}`
    }

    const {data, loading, error} = usePublicGetReq({
        url: base_url + 'estimation/ongoing',
        requestHeaders : requestHeaders
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