import React from 'react'
import { Button, Icon, Message, Step, Container } from "semantic-ui-react"
import { Route, Routes, useNavigate } from "react-router-dom"
import "../pages.css"
import { regularApiRequest } from "../../api/regularApiRequest";
import { useApiRequest } from '../../api/useApiRequest';
import { base_url } from '../../../index';
import TableTransactionList from '../../utils/TableTransactionList';
import { useParams } from 'react-router-dom';

const PaymentPage = () => {

    let navigate = useNavigate()

    const { id } = useParams();
    console.log("Id found to be ", id)

    var response, response2;

    const { data: dataHistory, dataLoading: dataLoadingHistory, error: errorHistory } = useApiRequest({
        url: base_url + 'payment/' + id + '/history',
        method: 'GET'
    })
    if (dataHistory) {
        response = dataHistory.responseData
        console.log("response is: ", response)
    }

    const { data: dataDues, dataLoading: dataLoadingDues, error: errorDues } = useApiRequest({
        url: base_url + 'payment/' + id + '/dues',
        method: 'GET'
    })
    if (dataDues) {
        response2 = dataDues.responseData
        console.log("Response2 : ", response2)
    }

    const initializePayment = async () =>{
        const reqBody = {
        };

        const response = await regularApiRequest({
            url: base_url + 'payment/' + id + '/init',
            method: 'POST',
            reqBody: reqBody
        })
        console.log("response URL was : ", response.data);
        window.location.replace(response.data);
    }

    return (
        <div>
            <div class="title">
                <br />
                <h1>{response && response.payment.projectName}</h1>
                <div class="ui raised very padded text container segment">
                    <h2 class="ui header">Payment Brief</h2>
                    <h3 class="ui header">Agency : {response2 && response2.agencyName}</h3>
                    <div class="content">
                        <div class="description">
                            <div class="ui segment">
                                <div class="ui two column very relaxed grid">
                                    <div class="column">
                                        <pre>
                                            <b>Total: </b> {response2 && response2.total_amount} ৳<br />
                                            <b>Paid: </b> {response2 && response2.paid_amount} ৳<br />
                                            <b>Due: </b> {response2 && response2.dueAmount} ৳<br />
                                        </pre>
                                    </div>
                                    <div class="column">
                                        <pre>
                                            <b>Total Installments: </b> {response2 && response2.emi_installment_choice}<br />
                                            <b>Installments Completed: </b> {response2 && response2.installments_completed}<br />
                                            <b>Installments Remaining: </b> {response2 && response2.remaining_installments}<br />
                                        </pre>
                                    </div>
                                </div>
                                <div class="ui vertical divider">
                                    and
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class="row">
                        <hr /><br />
                        <h1>All Transaction Histories</h1>
                        {response && <TableTransactionList tableData={response} />}
                    </div>
                </div>
                <br/>
                <br/>
                <Button primary onClick={initializePayment}>Proceed to Payment</Button>
                <br/>
                <br/>
            </div>
        </div>
    )
}
export default PaymentPage
