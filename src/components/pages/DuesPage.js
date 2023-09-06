import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import SingleDueCard from '../cards/SingleDueCard';
import { base_url } from '../../index';
import { useApiRequest } from '../api/useApiRequest';
import Cookies from "universal-cookie";

const DuesPage =  () => {

    const cookies = new Cookies();

    const [userType, setUserType] = React.useState(1);
    const [url, setURL] = React.useState(base_url + 'company/dues');

    useEffect(() => {
        if (cookies.get("userType") === '1'){
            setUserType(1)
            setURL(base_url + 'company/dues')
        } else if (cookies.get("userType") === '2'){
            setUserType(2)
            setURL(base_url + 'agency/dues')
        }
    }, []);
    
    const {data: response, dataLoading, error} = useApiRequest({
        url: url,
        method: 'GET',
    })

    return (
        <div>
            
            <h1>Dues</h1>
        <SingleDueCard data={response?.responseData} userType={userType}/>
        </div>
    )
}


export default DuesPage
