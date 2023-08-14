import React from 'react'
import { Button, Icon, Message, Step } from "semantic-ui-react"
import { Route, Routes, useNavigate } from "react-router-dom"
import "../pages.css"
import { regularApiRequest } from "../../api/regularApiRequest"
import { showToast } from '../../../App'

const FinalizePage = () => {

    let navigate = useNavigate()

    const initializePayment = () => {

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
                                <input placeholder="AdComm" readonly="" type="text" />
                            </div>
                            <div class="field">
                                <label>Company Name</label>
                                <input placeholder="Acme Corporation" readonly="" type="text" />
                            </div>
                        </div>

                        <div class="two fields">
                            <div class="field">
                                <label>Project Name</label>
                                <input placeholder="Acme New Medicine Advertisement" readonly="" type="text" />
                            </div>
                            <div class="field">
                                <label>Total Budget</label>
                                <input placeholder="12,000" readonly="" type="number" />
                            </div>
                        </div>

                        <label for="emi_choice">Choose your payment method:</label>
                        <div class="inline fields" id="emi_choice">
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="FULL" value="0" checked="true" tabindex="0" class="hidden" />
                                    <label>FULL</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="EMI" value="1" tabindex="" class="hidden" />
                                    <label>EMI</label>
                                </div>
                            </div>
                        </div>
                        <br />

                        <label for="emi_installment_choice">Select Your EMI Installment Choice:</label>
                        <div class="inline fields">
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="emi_installment_choice" value="3" tabindex="0" class="hidden" />
                                    <label>3 months</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="emi_installment_choice"  value="6" tabindex="0" class="hidden" />
                                    <label>6 months</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="emi_installment_choice" value="9"  tabindex="0" class="hidden" />
                                    <label>9 months</label>
                                </div>
                            </div>
                            <div class="field">
                                <div class="ui radio checkbox">
                                    <input type="radio" name="emi_installment_choice" value="12"  tabindex="0" class="hidden" />
                                    <label>12 months</label>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <label>Final Budget</label>
                            <input placeholder="14,460 BDT" readonly="" type="text" />
                        </div>
                        <div class="row">
                            <Button onClick={initializePayment} positive animated>
                                <Button.Content visible>Proceed To Payment</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='newPayment' />
                                </Button.Content>
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default FinalizePage
