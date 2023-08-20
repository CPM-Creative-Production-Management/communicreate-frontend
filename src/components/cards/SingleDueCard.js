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
                            <div class="header" style={{ textAlign: "center" }}>{currItem.projectName}</div>
                            <div class="meta" style={{ textAlign: "center" }}>
                                <span class="category">{currItem.agencyName}</span>
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

                        {currItem.overdue === 0 &&
                            <div class="extra content" style={{ textAlign: "center" }}>
                                <span class="floated time" style={{ color: 'green' }}><b>{currItem.message}</b></span>
                                <div class="ui green bottom attached button" tabindex="0" primary="true" onClick={() => { navigate('/payment/' + currItem.id) }}>
                                    See Details
                                </div>
                            </div>}
                        {currItem.overdue === 1 &&
                            <div class="extra content" style={{ textAlign: "center" }}>
                                <span class="floated time" style={{ color: 'red' }} ><b>{currItem.message}</b></span>
                                <div class="ui red bottom attached button" tabindex="0" primary="true" onClick={() => { navigate('/payment/' + currItem.id) }}>
                                    Clear Dues
                                </div>
                            </div>}
                        {currItem.overdue === 2 &&
                            <div class="extra content" style={{ textAlign: "center" }}>
                                <span class="floated time" style={{ color: 'grey' }} ><b>{currItem.message}</b></span>
                                <div class="ui grey bottom attached button" tabindex="0" primary="true">
                                    Done
                                </div>
                            </div>}
                    </div>

                ))}
            </div>
        </div>
    )
}
export default SingleDueCard
