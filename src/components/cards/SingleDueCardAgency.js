import React, { useEffect } from 'react'
import { Button, Header } from "semantic-ui-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingleDueCardAgency = ({ data }) => {

    let navigate = useNavigate()

    return (
        <div>
            <div class="ui link cards">
                {data?.map((currItem, index) => (

                    <div class="card" key={currItem.id}>
                        <div class="content">
                            <div class="header" style={{ textAlign: "center" }}>{currItem.projectName}</div>
                            <div class="meta" style={{ textAlign: "center" }}>
                                <span class="category">{currItem.companyName}</span>
                            </div>
                            <div class="description">
                                <pre class="dues-background">
                                    <b>Total: </b> {currItem.total_amount}  ৳<br />
                                    <b>Paid: </b> {currItem.paid_amount}  ৳<br />
                                    <b>Due: </b> {currItem.dueAmount}  ৳<br />
                                </pre>
                            </div>
                            {/* {currItem.category === "EMI" &&
                                <div class="description">
                                    <div class="meta" style={{ textAlign: "center" }}>
                                        <span class="category">EMI Details</span>
                                    </div>
                                    <pre class="emi-background">
                                        <b>Total Installments: </b> {currItem.emi_installment_choice}<br />
                                        <b>Installments Completed: </b> {currItem.installments_completed}<br />
                                        <b>Installments Remaining: </b> {currItem.remaining_installments}<br />
                                    </pre>
                                </div>
                            } */}
                        </div>
                        <div class="extra content" style={{ textAlign: "center" }}>
                            <span class="floated time" style={{ color: 'blue' }}><b>{currItem.message}</b></span>
                            <div class="ui blue bottom attached button" tabindex="0" primary="true" onClick={() => { navigate('/payment/' + currItem.id) }}>
                                See Details
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    )
}
export default SingleDueCardAgency
