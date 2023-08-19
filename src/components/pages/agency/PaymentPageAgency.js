import React from 'react'
import { Button, Icon, Message, Step, Container } from "semantic-ui-react"
import { Route, Routes, useNavigate } from "react-router-dom"
import "../pages.css"
import { regularApiRequest } from "../../api/regularApiRequest";
import { useApiRequest } from '../../api/useApiRequest';
import { base_url } from '../../../index';
import TableTransactionList from '../../utils/TableTransactionList';
import { useParams } from 'react-router-dom';

const PaymentPageAgency = () => {

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
        console.log('Response2 : ', response2)
    }

    return (
        <div>
            <div>
                <h1 style={{ textAlign: "center" }}>{response && response.payment.projectName}</h1>
                <h2 style={{ textAlign: "center" }}>Company : {response2 && response2.companyName}</h2>
                <div class="ui raised text container segment" style={{ backgroundColor: "#dad7fa" }}>
                    <h2 class="ui header" style={{ textAlign: "center" }}>Payment Brief</h2>
                    <div class="content">
                        <div class="description">
                            <div class="ui segment" style={{ backgroundColor: "#ffe6fb" }}>
                                {response2 && response2.category === "EMI" &&
                                    <div>
                                        <div class="ui two column very relaxed grid">
                                            <div class="column" style={{ textAlign: "center" }}>
                                                <pre>
                                                    <b>Total: </b> {response2 && response2.total_amount} ৳<br />
                                                    <b>Paid: </b> {response2 && response2.paid_amount} ৳<br />
                                                    <b>Total Due: </b> {response2 && response2.dueAmount} ৳<br />
                                                    <b>Due Now: </b> {response2 && response2.due_to_pay_now} ৳<br />
                                                </pre>
                                            </div>

                                            <div class="column" style={{ textAlign: "center" }}>
                                                <pre>
                                                    <b>{response2 && response2.message}</b><br />
                                                    <b>Total Installments: </b> {response2 && response2.emi_installment_choice}<br />
                                                    <b>Installments Completed: </b> {response2 && response2.installments_completed}<br />
                                                    <b>Installments Remaining: </b> {response2 && response2.remaining_installments}<br />
                                                </pre>
                                            </div>
                                        </div>
                                        <div class="ui vertical divider">and</div>
                                    </div>
                                }
                                {response2 && response2.category === "FULL" &&
                                    <div>
                                        <div class="ui two column very relaxed grid">
                                            <div class="column" style={{ textAlign: "center" }}>
                                                <br />
                                                <pre>
                                                    <b>Total: </b> {response2 && response2.total_amount} ৳<br />
                                                    <b>Paid: </b> {response2 && response2.paid_amount} ৳<br />
                                                    <b>Due: </b> {response2 && response2.dueAmount} ৳<br />
                                                    <b>{response2 && response2.message}</b><br />
                                                </pre>
                                            </div>

                                            <div class="column" style={{ textAlign: "center" }}>
                                                <pre>
                                                    No EMI information available<br/> 
                                                    because Client opted for a<br/>
                                                    full payment.
                                                </pre>
                                            </div>
                                        </div>
                                        <div class="ui vertical divider"></div>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <div class="row">
                        <hr /><br />
                        <h1 style={{ textAlign: "center" }}>All Transaction Histories</h1>
                        {response && <TableTransactionList tableData={response} />}
                    </div>
                </div>
                <br />
                <br />
            </div>
        </div>
    )
}
export default PaymentPageAgency
