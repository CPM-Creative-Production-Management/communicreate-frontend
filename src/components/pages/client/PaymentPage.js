import React from 'react'
import { Button, Icon, Message, Step } from "semantic-ui-react"
import { Route, Routes, useNavigate } from "react-router-dom"
import "../pages.css"
import { regularApiRequest } from "../../api/regularApiRequest"
import { showToast } from '../../../App'

const PaymentPage = async () => {

    const response = await regularApiRequest({
        url: 'http://localhost:3000/payment/id/dues',
        method: 'GET'
    })
    if (response.status === 200) {
        showToast('Fetched all transaction histories', 'success')
    } else {
        showToast('Error creating payment', 'error')
    }

    return (
        <div>
            <div class="row">
            <br></br>
                <h1>Transaction Histories</h1>
                
            </div>
        </div>
    )
}
export default PaymentPage
