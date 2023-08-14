import React, { useEffect } from 'react'
import { Button, Header } from "semantic-ui-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingleDueCard = ({ data }) => {

    let navigate = useNavigate()

    return (
        <div>
            <div class="ui link cards">
            {data?.map((currItem, index) => (
                
                    <div class="card" key={currItem.id}>
                        <div class="content">
                            <div class="header">{currItem.projectName}</div>
                            <div class="meta">
                                <span class="category">{currItem.agencyName}</span>
                            </div>
                            <div class="description">
                                <pre class="dues-background">
                                    <b>Total: </b> {currItem.total_amount} {currItem.currency}<br />
                                    <b>Paid: </b> {currItem.paid_amount} {currItem.currency}<br />
                                    <b>Due: </b> {currItem.dueAmount} {currItem.currency}<br />
                                    <b>Total Installments: </b> {currItem.emi_installment_choice}<br />
                                    <b>Installments Completed: </b> {currItem.installments_completed}<br />
                                    <b>Installments Remaining: </b> {currItem.remaining_installments}<br />
                                </pre>
                            </div>
                        </div>
                        <div class="extra content">
                            <span class="floated time"><b>{currItem.days}</b></span>
                            <div class="right floated author">
                                <Button type="button" primary="true" onClick={() => { navigate('/payment') }} >Clear Dues</Button>
                            </div>
                        </div>
                    </div>
                
            ))}
            </div>
        </div>
    )
}
export default SingleDueCard
