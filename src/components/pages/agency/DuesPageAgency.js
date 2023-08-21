import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import "../pages.css"
import { regularApiRequest } from "../../api/regularApiRequest"
import SingleDueCardAgency from '../../cards/SingleDueCardAgency';
import { showToast } from '../../../App'
import { base_url } from '../../../index';
import { useApiRequest } from '../../api/useApiRequest';
import { CircularProgress } from '@mui/material';

const DuesPageAgency =  () => {

    const {data: response, dataLoading, error} = useApiRequest({
        url: base_url + 'agency/dues',
        method: 'GET',
    })

        return (
            <div>
                <br></br>
                <h1>Dues</h1>
               <SingleDueCardAgency data={response?.responseData} />

            </div>
        )
    }


export default DuesPageAgency
