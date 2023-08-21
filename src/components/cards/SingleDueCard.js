import React, {useEffect} from 'react'
import {Button, Header, Grid} from "semantic-ui-react";
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const SingleDueCard = ({data}) => {

    let navigate = useNavigate()

    return (
        <div>
            <div className="ui link cards">
                {data?.map((currItem, index) => (

                    <div className="card" key={currItem.id}>
                        <div className="content">
                            <div className="header" style={{textAlign: "center"}}>{currItem.projectName}</div>
                            <div className="meta" style={{textAlign: "center"}}>
                                <span className="category">{currItem.agencyName}</span>
                            </div>
                            <div className="description">

                                <pre className="dues-background">
                                    <div className={'p-3'}>

                                        <Grid columns={2}>

                                                <Grid.Column width={8}>
                                                    <b>Total </b>
                                                </Grid.Column>
                                                <Grid.Column fluid width={4}>
                                                     <div> {currItem.total_amount} ৳ </div>
                                                </Grid.Column>

                                        </Grid>

                                        <Grid columns={2}>

                                                <Grid.Column width={8}>
                                                    <b>Paid </b>
                                                </Grid.Column>
                                                <Grid.Column fluid width={4}>
                                                     <div> {currItem.paid_amount} ৳ </div>
                                                </Grid.Column>

                                        </Grid>

                                        <hr/>

                                        <Grid columns={2}>

                                                <Grid.Column width={8}>
                                                    <b>Due </b>
                                                </Grid.Column>
                                                <Grid.Column fluid width={4}>
                                                     <div> {currItem.dueAmount} ৳ </div>
                                                </Grid.Column>

                                        </Grid>


                                        </div>
                                </pre>

                            </div>
                            {/* {currItem.category === "EMI" &&
                                <div className="description">
                                    <div className="meta" style={{ textAlign: "center" }}>
                                        <span className="category">EMI Details</span>
                                    </div>
                                    <pre className="emi-background">
                                        <b>Total Installments: </b> {currItem.emi_installment_choice}<br />
                                        <b>Installments Completed: </b> {currItem.installments_completed}<br />
                                        <b>Installments Remaining: </b> {currItem.remaining_installments}<br />
                                    </pre>
                                </div>
                            } */}
                        </div>

                        {currItem.overdue === 0 &&
                            <div className="extra content" style={{textAlign: "center"}}>
                                <span className="floated time" style={{color: 'green'}}>
                                    <div className={'mb-3'}>
                                    <b>{currItem.message}</b>
                                        </div>
                                </span>
                                <div className="ui green bottom attached button" tabindex="0" primary="true"
                                     onClick={() => {
                                         navigate('/payment/' + currItem.id)
                                     }}>
                                    See Details
                                </div>
                            </div>}
                        {currItem.overdue === 1 &&
                            <div className="extra content" style={{textAlign: "center"}}>
                                <span className="floated time" style={{color: 'red'}}>
                                    <div className={'mb-3'}>
                                    <b>{currItem.message}</b>
                                        </div>
                                </span>
                                <div className="ui red bottom attached button" tabindex="0" primary="true"
                                     onClick={() => {
                                         navigate('/payment/' + currItem.id)
                                     }}>
                                    Clear Dues
                                </div>
                            </div>}
                        {currItem.overdue === 2 &&
                            <div className="extra content" style={{textAlign: "center"}}>
                                <span className="floated time" style={{color: 'grey'}}>
                                    <div className={'mb-3'}>
                                    <b>{currItem.message}</b>
                                        </div>
                                </span>
                                <div className="ui grey bottom attached button" tabindex="0" primary="true">
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
