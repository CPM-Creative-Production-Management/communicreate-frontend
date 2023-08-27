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
    const [paymentType, setPaymentType] = useState(0)
    const [EMI, setEMI] = useState(3)
    const [redirectURL, setRedirectURL] = useState('')
    

    let componentToRender;

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

    const handleEMIChange = (e) => {
        setEMI(parseInt(e.target.value))
    }

    const newPayment = async (e) => {
        e.preventDefault()

        if (estimationData) {
            const reqBody = {
                amount: estimationData.cost,
                estimation_id: estimationData.id,
                emi_option: paymentType,
                emi_installment_choice: EMI,
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

                                <label for="emi_choice">Choose your payment method:</label>
                                <div className="inline fields" id="emi_choice">
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
                                            <label>FULL</label>
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
                                            <label>EMI</label>
                                        </div>
                                    </div>
                                </div>
                                <br />

                                <label for="emi_installment_choice">Select Your EMI Installment Choice:</label>
                                <div class="inline fields">
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" name="emi_installment_choice" value="3" disabled={paymentType === 0} onChange={handleEMIChange} tabindex="0" />
                                            <label>3 months</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" name="emi_installment_choice" value="6" disabled={paymentType === 0} onChange={handleEMIChange} tabindex="0" />
                                            <label>6 months</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" name="emi_installment_choice" value="9" disabled={paymentType === 0} onChange={handleEMIChange} tabindex="0" />
                                            <label>9 months</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" name="emi_installment_choice" value="12" disabled={paymentType === 0} onChange={handleEMIChange} tabindex="0" />
                                            <label>12 months</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <Button fluid color='green' onClick={(e) => newPayment(e)} positive>
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

                                <label for="emi_choice">Choose your payment method:</label>
                                <div className="inline fields" id="emi_choice">
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
                                            <label>FULL</label>
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
                                            <label>EMI</label>
                                        </div>
                                    </div>
                                </div>
                                <br />

                                <label for="emi_installment_choice">Select Your EMI Installment Choice:</label>
                                <div class="inline fields">
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" checked={EMI === 3} name="emi_installment_choice" value="3" disabled={true} tabindex="0" />
                                            <label>3 months</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" checked={EMI === 6}  name="emi_installment_choice" value="6" disabled={true} tabindex="1" />
                                            <label>6 months</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" checked={EMI === 9}  name="emi_installment_choice" value="9" disabled={true} tabindex="2" />
                                            <label>9 months</label>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <div class="ui radio checkbox">
                                            <input type="radio" checked={EMI === 12} name="emi_installment_choice" value="12" disabled={true} tabindex="3" />
                                            <label>12 months</label>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="ui grey button" tabindex="0" primary="true">
                                        Confirmed
                                    </div>
                                </div>
                            </form>
                            <br />
                        </div>
                    </div>
                    <br/>
                    <div class="ui two column doubling stackable grid container">
                        <div class="column">
                            <div class="fluid ui green button" onClick={()=>{navigate(redirectURL)}} tabindex="0" primary="true">
                                Pay Now
                            </div>
                        </div>
                        <div class="column">
                            <div class="fluid ui green button" onClick={()=>{navigate('/')}} tabindex="0" primary="true">
                                Pay Later
                            </div>
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