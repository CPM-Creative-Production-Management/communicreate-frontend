import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import "../pages.css"
import { regularApiRequest } from "../../api/regularApiRequest"
import SingleDueCard from '../../cards/SingleDueCard';
import { showToast } from '../../../App'
import { base_url } from '../../../index';
import { useApiRequest } from '../../api/useApiRequest';

const DuesPage =  () => {

    const {data: response, dataLoading, error} = useApiRequest({
        url: base_url + 'company/dues',
        method: 'GET',
    })
    // console.log("Here response : ", response.responseData)

        return (
            <div>
                <br></br>
                <h1>Dues</h1>
                {response && <SingleDueCard data={response.responseData} />}
            </div>
        )
    }


export default DuesPage
