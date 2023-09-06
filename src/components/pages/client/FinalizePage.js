import React, { useEffect, useState } from 'react'
import { Button, Icon, Message, Step } from "semantic-ui-react"
import { Route, Routes, useNavigate } from "react-router-dom"
import "../pages.css"
import { regularApiRequest } from "../../api/regularApiRequest"
import { useApiRequest } from '../../api/useApiRequest'
import { showToast } from '../../../App'
import { base_url } from '../../..'
import { useParams } from 'react-router-dom'

const FinalizePage = () => {

    let navigate = useNavigate()

    const [stepNum, setStepNum] = useState(2)
    const { rid, aid } = useParams()
    const [paymentType, setPaymentType] = useState(1)
    const [redirectURL, setRedirectURL] = useState('')

    const { data: estimationData, dataLoading: dataLoadingEstimation, error } = useApiRequest({
        url: base_url + 'estimation/request/' + rid + '/agency/' + aid,
        method: 'GET'
    })

    useEffect(() => {
        console.log("redirectURL : ", redirectURL)
    }, [redirectURL])

    useEffect(() => {
        if (!dataLoadingEstimation && estimationData) {
            if (estimationData.finalized) {
                showToast('Estimation has been finalized already', 'error')
            }
        }
    }, [dataLoadingEstimation])

    const handlePaymentTypeChange = (e) => {
        setPaymentType(parseInt(e.target.value))
    }

    const newPayment = async (e) => {
        e.preventDefault()

        const response = await regularApiRequest({
            url: base_url + 'request/' + rid + '/agency/' + aid + '/finalize',
            method: 'POST'
        })

        if (estimationData) {
            const reqBody = {
                amount: estimationData.cost,
                estimation_id: estimationData.id,
                payment_type: paymentType,
                company_id: estimationData.ReqAgency.Company.id,
                agency_id: estimationData.ReqAgency.Agency.id
            }
            const response = await regularApiRequest({
                url: base_url + 'payment/new',
                method: 'POST',
                reqBody: reqBody
            })
            console.log("Response is : ", response)
            if (response.status === 200) {
                setStepNum(3)
                if(response.data.responseCode === 1){
                    setRedirectURL('/payment/'+response.data.payment_id)
                    showToast('Your choice is saved succesfully', 'success')
                } else {
                    showToast('Your choice was confirmed already', 'error')
                    navigate('/')
                }
            } else {
                showToast('Error saving information', 'error')
            }
        } else {
            console.log('No estimation yet')
        }
    }

    const Step2Render = () => {
        return (
            <div>
                <div class="row">
                    <div class="ui ordered steps">
                        <div class="completed step">
                            <div class="content">
                                <div class="title">Finalize</div>
                                <div class="description">Your estimation is finalized!</div>
                            </div>
                        </div>
                        <div class="active step">
                            <div class="content">
                                <div class="title">Billing</div>
                                <div class="description">Enter billing information</div>
                            </div>
                        </div>
                        <div class="disabled step">
                            <div class="content">
                                <div class="title">Confirm Payment</div>
                                <div class="description">Initialize your transaction</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <h2 class="ui horizontal divider header">
                        <i class="icon-usd"></i>
                        Check Your Information
                    </h2>
                    <div class="ui one column doubling stackable grid container">
                        <div class="column">
                            <form class="ui form">
                                <div class="two fields">
                                    <div class="field">
                                        <label>Agency Name</label>
                                        <input value={estimationData?.ReqAgency.Agency.name} readOnly="" disabled type="text" />
                                    </div>
                                    <div class="field">
                                        <label>Company Name</label>
                                        <input value={estimationData?.ReqAgency.Company.name} readOnly="" disabled type="text" />
                                    </div>
                                </div>

                                <div class="two fields">
                                    <div class="field">
                                        <label>Project Name</label>
                                        <input value={estimationData?.ReqAgency.Request.name} readOnly="" disabled type="text" />
                                    </div>
                                    <div class="field">
                                        <label>Total Budget</label>
                                        <input value={estimationData?.cost} readOnly="" disabled type="number" />
                                    </div>
                                </div>

                                <label for="paymentType">Choose your payment method:</label>
                                <div className="inline fields" id="paymentType">
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input
                                                type="radio"
                                                name="choice"
                                                value={0}
                                                checked={paymentType === 0}
                                                onChange={handlePaymentTypeChange}
                                                tabIndex="0"
                                            />
                                            <label>One-Time Payment</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input
                                                type="radio"
                                                name="choice"
                                                value={1}
                                                checked={paymentType === 1}
                                                onChange={handlePaymentTypeChange}
                                                tabIndex="1"
                                            />
                                            <label>Task-by-Task Payment</label>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <Button color='green' onClick={(e) => newPayment(e)} positive>
                                        Confirm
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    const Step3Render = () => {
        return (
            <div>
                <div class="row">
                    <div class="ui ordered steps">
                        <div class="completed step">
                            <div class="content">
                                <div class="title">Finalize</div>
                                <div class="description">Your estimation is finalized!</div>
                            </div>
                        </div>
                        <div class="completed step">
                            <div class="content">
                                <div class="title">Billing</div>
                                <div class="description">Enter billing information</div>
                            </div>
                        </div>
                        <div class="active step">
                            <div class="content">
                                <div class="title">Confirm Payment</div>
                                <div class="description">Initialize your transaction</div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div>
                    <h2 class="ui horizontal divider header">
                        <i class="icon-usd"></i>
                        Check Your Information
                    </h2>
                    <div class="ui one column doubling stackable grid container">
                        <div class="column">
                            <form class="ui form">
                                <div class="two fields">
                                    <div class="field">
                                        <label>Agency Name</label>
                                        <input value={estimationData?.ReqAgency.Agency.name} readOnly="" disabled type="text" />
                                    </div>
                                    <div class="field">
                                        <label>Company Name</label>
                                        <input value={estimationData?.ReqAgency.Company.name} readOnly="" disabled type="text" />
                                    </div>
                                </div>

                                <div class="two fields">
                                    <div class="field">
                                        <label>Project Name</label>
                                        <input value={estimationData?.ReqAgency.Request.name} readOnly="" disabled type="text" />
                                    </div>
                                    <div class="field">
                                        <label>Total Budget</label>
                                        <input value={estimationData?.cost} readOnly="" disabled type="number" />
                                    </div>
                                </div>

                                <label for="paymentType">Choose your payment method:</label>
                                <div className="inline fields" id="paymentType">
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input
                                                type="radio"
                                                name="choice"
                                                value={0}
                                                checked={paymentType === 0}
                                                disabled={true}
                                                tabIndex="0"
                                            />
                                            <label>One-Time Payment</label>
                                        </div>
                                    </div>
                                    <div className="field">
                                        <div className="ui radio checkbox">
                                            <input
                                                type="radio"
                                                name="choice"
                                                value={1}
                                                checked={paymentType === 1}
                                                disabled={true}
                                                tabIndex="1"
                                            />
                                            <label>Task-by-Task Payment</label>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div class="row">
                                    <Button fluid disabled>
                                        Confirmed
                                    </Button>
                                </div>
                            </form>
                            <br />
                        </div>
                    </div>
                    <br/>
                    <div class="ui two column doubling stackable grid container">
                        <div class="column">
                            <Button fluid color='green' onClick={()=>{navigate(redirectURL)}}>
                                Pay Now
                            </Button>
                        </div>
                        <div class="column">
                            <Button fluid color='green' onClick={()=>{navigate('/')}}>
                                Pay Later
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // if (stepNum === 2) {
    //     componentToRender = <Step2Render />;
    // } else if (stepNum === 3) {
    //     componentToRender = <Step3Render />;
    // }

    return (
        <div>
            {stepNum === 2 && <Step2Render/>}

            {stepNum === 3 && <Step3Render/>}

        </div>
    )
}
export default FinalizePage