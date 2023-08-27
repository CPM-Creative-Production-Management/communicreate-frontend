import React from 'react'
import { Button} from "semantic-ui-react"
import "./pages.css"
import { regularApiRequest } from "../api/regularApiRequest";
import { useApiRequest } from '../api/useApiRequest';
import { useEffect } from 'react';
import { base_url } from '../../index';
import TableTransactionList from '../utils/TableTransactionList';
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

    const initializePayment = async (amount) => {
        console.log("Amount inside initializePayment() is : ", amount)
        const reqBody = {
            amount: amount
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
                        <div className="content">
                            <div className="description">
                                <div className="ui segment" style={{ backgroundColor: "#a9e5fc" }}>
                                    {responseDues.category === "EMI" &&
                                        <div>
                                            <div className="ui two column very relaxed grid">
                                                <div className="column" style={{ textAlign: "center" }}>
                                                    <pre>
                                                        <b>Total: </b> {responseDues.total_amount} ৳<br />
                                                        <b>Paid: </b> {responseDues.paid_amount} ৳<br />
                                                        <b>Total Due: </b> {responseDues.dueAmount} ৳<br />
                                                        <b>Due for Current Month: </b> {responseDues.due_to_pay_now} ৳<br />
                                                    </pre>
                                                </div>

                                                <div className="column" style={{ textAlign: "center" }}>
                                                    <pre>
                                                        <b>{responseDues.message}</b><br />
                                                        <b>Total Installments: </b> {responseDues.emi_installment_choice}<br />
                                                        <b>Installments Completed: </b> {responseDues.installments_completed}<br />
                                                        <b>Installments Remaining: </b> {responseDues.remaining_installments}<br />
                                                    </pre>
                                                </div>
                                            </div>
                                            <div className="ui vertical divider">and</div>
                                        </div>
                                    }
                                    {responseDues.category === "FULL" &&
                                        <div>
                                            <div className="ui two column very relaxed grid">
                                                <div className="column" style={{ textAlign: "center" }}>
                                                    <br />
                                                    <pre>
                                                        <b>Total: </b> {responseDues.total_amount} ৳<br />
                                                        <b>Paid: </b> {responseDues.paid_amount} ৳<br />
                                                        <b>Due: </b> {responseDues.dueAmount} ৳<br />
                                                        <b>{responseDues.message}</b><br />
                                                    </pre>
                                                </div>

                                                <div className="column" style={{ textAlign: "center" }}>
                                                    <pre>
                                                        You had chosen FULL Payment <br />
                                                        earlier, so you need to pay <br />
                                                        the total due at once. <br />
                                                        You can do transaction of <br />
                                                        at most 50,000 BDT at a time.
                                                    </pre>
                                                </div>
                                            </div>
                                            <div className="ui vertical divider"></div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <br/>

                        {userType === 1 && responseDues.due_to_pay_now !== 0 &&
                            <Button fluid animated='vertical' color='green'
                                onClick={() => {
                                    initializePayment(responseDues.due_to_pay_now)
                                }}
                            >
                                <Button.Content visible>Proceed to Payment</Button.Content>
                                <Button.Content hidden>{responseDues?.due_to_pay_now} ৳</Button.Content>
                            </Button>
                        }

                        {userType === 1 && responseDues.due_to_pay_now === 0 &&
                            <Button fluid disabled>
                                <Button.Content visible>Dues Already Cleared</Button.Content>
                            </Button>
                        }
                    </div>
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
