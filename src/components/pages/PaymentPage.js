import React from 'react'
import { Button, Message } from "semantic-ui-react"
import "./pages.css"
import { regularApiRequest } from "../api/regularApiRequest";
import { useApiRequest } from '../api/useApiRequest';
import { useEffect } from 'react';
import { base_url } from '../../index';
import TableTransactionList from '../utils/TableTransactionList';
import TableTaskList from '../utils/TableTaskList';
import { useParams } from 'react-router-dom';
import Cookies from "universal-cookie";

const PaymentPage = () => {

    const { id } = useParams();
    console.log("Id found to be ", id)

    const cookies = new Cookies();

    const [userType, setUserType] = React.useState(1);

    useEffect(() => {
        if (cookies.get("userType") === '1') {
            setUserType(1)
        } else if (cookies.get("userType") === '2') {
            setUserType(2)
        }
    }, []);

    var responseHistory, responseDues;

    // For showing the Payment Brief
    const { data: dataDues, dataLoading: dataLoadingDues, error: errorDues } = useApiRequest({
        url: base_url + 'payment/' + id + '/dues',
        method: 'GET'
    })
    if (dataDues) {
        responseDues = dataDues.responseData
        console.log('ResponseDues : ', responseDues)
    }

    // For showing the All Transaction Histories table
    const { data: dataHistory, dataLoading: dataLoadingHistory, error: errorHistory } = useApiRequest({
        url: base_url + 'payment/' + id + '/history',
        method: 'GET'
    })
    if (dataHistory) {
        responseHistory = dataHistory.responseData
        console.log("responseHistory is: ", responseHistory)
    }

    const initializePayment = async () => {
        const reqBody = {
            taskId: null
        };

        const responseHistory = await regularApiRequest({
            url: base_url + 'payment/' + id + '/init',
            method: 'POST',
            reqBody: reqBody
        })
        console.log("responseHistory URL was : ", responseHistory.data);
        window.location.replace(responseHistory.data);
    }

    return (
        <div>
            {responseHistory && responseDues &&
                <div>
                    <h1 style={{ textAlign: "center" }}>{responseHistory.payment.projectName}</h1>
                    {userType === 1 ?
                        <h2 style={{ textAlign: "center" }}>Agency : {responseDues.agencyName}</h2> :
                        <h2 style={{ textAlign: "center" }}>Company : {responseDues.companyName}</h2>
                    }
                    <div className="ui raised text container segment" style={{ backgroundColor: "#dee0fa" }}>
                        <h2 className="ui header" style={{ textAlign: "center" }}>Payment Brief</h2>
                        <div className="content" style={{ textAlign: 'center' }}>
                            <div className="description">
                                <div className="ui segment">
                                    <div>
                                        <pre>
                                            <b>Total: </b> {responseDues.total_amount} ৳<br />
                                            <b>Paid: </b> {responseDues.paid_amount} ৳<br />
                                            <b>Due: </b> {responseDues.due_amount} ৳<br />
                                        </pre>
                                        {responseDues.overdue === 0 && <Message color='green'>{responseDues.message}</Message>}
                                        {responseDues.overdue === 1 && <Message color='red'>{responseDues.message}</Message>}
                                        {responseDues.overdue === 2 && <Message color='orange'>{responseDues.message}</Message>}
                                        {responseDues.overdue === 3 && <Message color='grey'>{responseDues.message}</Message>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <br />
                        {responseDues.payment_type === 0 && responseDues.due_amount != "0.00" &&
                            <Button fluid color='green' onClick={() => initializePayment}>
                                Make Full Payment
                            </Button>
                        }
                        <br />
                    </div>
                    <br />
                    <br />
                    <div>
                        <div className="row">
                            <hr />
                            <br />
                            <h1 style={{ textAlign: "center" }}>Task Details</h1>
                            {<TableTaskList paymentId={id} userType={userType} taskData={responseDues.tasks} paymentType={responseDues.payment_type} />}
                        </div>
                    </div>
                    <br />
                    <br />
                    <div>
                        <div className="row">
                            <hr />
                            <br />
                            <h1 style={{ textAlign: "center" }}>All Transaction Histories</h1>
                            {<TableTransactionList tableData={responseHistory} />}
                        </div>
                    </div>
                    <br />
                    <br />
                </div>
            }
        </div>
    )
}
export default PaymentPage
