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

    const { rid, aid } = useParams()
    const [paymentType, setPaymentType] = useState(0)
    const [EMI, setEMI] = useState(3)

    const {data: estimationData, dataLoading: dataLoadingEstimation, error} = useApiRequest({
        url: base_url + 'estimation/request/' + rid + '/agency/' + aid,
        method: 'GET'
    })

    useEffect(() => {
        if (!dataLoadingEstimation && estimationData) {
            if (estimationData.finalized) {
                showToast('Estimation has been finalized already', 'error')
                navigate('/')
            }
        }
    }, [dataLoadingEstimation])

    const initializePayment = (e) => {
        e.preventDefault()
        if (estimationData) {
            const body = {
                amount: estimationData.cost,
                estimation_id: estimationData.id,
                emi_option: paymentType,
                emi_installment_choice: EMI,
                company_id: estimationData.ReqAgency.Company.id,
                agency_id: estimationData.ReqAgency.Agency.id
            }
            console.log(body)
        } else {
            console.log('no estimation yet')
        }
    }

    const handlePaymentTypeChange = (e) => {
        setPaymentType(parseInt(e.target.value))
    }

    const handleEMIChange = (e) => {
        setEMI(parseInt(e.target.value))
    }

    const newPayment = async () => {
        const reqBody = {
            amount: 120000,
            estimation_id: 7,
            emi_option: 1,
            emi_installment_choice: 12,
            company_id: 1,
            agency_id: 1
        }
        const response = await regularApiRequest({
            url: 'http://localhost:3000/payment/new',
            method: 'POST',
            reqBody: reqBody
        })
        if (response.status === 200) {
            showToast('New payment created succesfully', 'success')
            navigate('/payment/dues')
        } else {
            showToast('Error creating payment', 'error')
        }
    }

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
                                <input value={estimationData?.ReqAgency.Agency.name} readonly="" disabled type="text" />
                            </div>
                            <div class="field">
                                <label>Company Name</label>
                                <input value={estimationData?.ReqAgency.Company.name} readonly="" disabled type="text" />
                            </div>
                        </div>

                        <div class="two fields">
                            <div class="field">
                                <label>Project Name</label>
                                <input value={estimationData?.ReqAgency.Request.name} readonly="" disabled type="text" />
                            </div>
                            <div class="field">
                                <label>Total Budget</label>
                                <input value={estimationData?.cost} readonly="" disabled type="number" />
                            </div>
                        </div>

                        <label for="emi_choice">Choose your payment method:</label>
                        {/* <div class="inline fields" id="emi_choice">
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="FULL" value="0" tabindex="0" />
                                    <label>FULL</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="EMI" value="1" tabindex="1" />
                                    <label>EMI</label>
                                </div>
                            </div>
                        </div> */}
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
                                    <input type="radio" name="emi_installment_choice"  value="6" disabled={paymentType === 0} onChange={handleEMIChange} tabindex="0" />
                                    <label>6 months</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="emi_installment_choice" value="9" disabled={paymentType === 0} onChange={handleEMIChange}  tabindex="0" />
                                    <label>9 months</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="emi_installment_choice" value="12" disabled={paymentType === 0} onChange={handleEMIChange}  tabindex="0" />
                                    <label>12 months</label>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <label>Final Budget</label>
                            <input value={estimationData?.cost} disabled readonly="" type="text" />
                        </div>
                        <div class="row">
                            <Button onClick={(e) => initializePayment(e)} positive>
                                Proceed To Payment
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default FinalizePage