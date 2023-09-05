import React, { useEffect } from 'react'
import { Button, Header, Grid } from "semantic-ui-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SingleDueCard = ({ data, userType }) => {

    let navigate = useNavigate()

    return (
        <div>
            <div className="ui link cards">
                {data?.map((currItem, index) => (

                    <div className="card" key={currItem.id}>
                        <div className="content">
                            <div className="header" style={{ textAlign: "center" }}>{currItem.projectName}</div>
                            <div className="meta" style={{ textAlign: "center" }}>
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

                                        <hr />

                                        <Grid columns={2}>

                                            <Grid.Column width={8}>
                                                <b>Due </b>
                                            </Grid.Column>
                                            <Grid.Column fluid width={4}>
                                                <div> {currItem.due_amount} ৳ </div>
                                            </Grid.Column>

                                        </Grid>


                                    </div>
                                </pre>

                            </div>
                        </div>

                        {userType === 1 && currItem.overdue === 0 &&
                            <div className="extra content" style={{ textAlign: "center" }}>
                                <span className="floated time" style={{ color: 'green' }}>
                                    <div className={'mb-3'}>
                                        <b>{currItem.message}</b>
                                    </div>
                                </span>
                                <Button fluid attached='bottom' color='green'
                                    onClick={() => {
                                        navigate('/payment/' + currItem.id)
                                    }}>
                                    See Details
                                </Button>
                            </div>
                        }

                        {userType === 1 && currItem.overdue === 1 &&
                            <div className="extra content" style={{ textAlign: "center" }}>
                                <span className="floated time" style={{ color: 'red' }}>
                                    <div className={'mb-3'}>
                                        <b>{currItem.message}</b>
                                    </div>
                                </span>
                                <Button fluid attached='bottom' color='red'
                                    onClick={() => {
                                        navigate('/payment/' + currItem.id)
                                    }}>
                                    Clear Dues
                                </Button>
                            </div>
                        }

                        {userType === 1 && currItem.overdue === 2 &&
                            <div className="extra content" style={{ textAlign: "center" }}>
                                <span className="floated time" style={{ color: 'orange' }}>
                                    <div className={'mb-3'}>
                                        <b>{currItem.message}</b>
                                    </div>
                                </span>
                                <Button fluid attached='bottom' color='orange'
                                    onClick={() => {
                                        navigate('/payment/' + currItem.id)
                                    }}>
                                    See Details
                                </Button>
                            </div>
                        }

                        {userType === 1 && currItem.overdue === 3 &&
                            <div className="extra content" style={{ textAlign: "center" }}>
                                <span className="floated time" style={{ color: 'grey' }}>
                                    <div className={'mb-3'}>
                                        <b>{currItem.message}</b>
                                    </div>
                                </span>
                                <Button fluid attached='bottom' color='grey'
                                    onClick={() => {
                                        navigate('/payment/' + currItem.id)
                                    }}>
                                    See Details
                                </Button>
                            </div>
                        }

                        {userType === 2 && currItem.due_amount !== "0.00" &&
                            <div className="extra content" style={{ textAlign: "center" }}>
                                <span className="floated time" style={{ color: 'blue' }}>
                                    <div className={'mb-3'}>
                                        <b>{currItem.message}</b>
                                    </div>
                                </span>
                                <Button fluid attached='bottom' color='blue'
                                    onClick={() => {
                                        navigate('/payment/' + currItem.id)
                                    }}>
                                    See Details
                                </Button>
                            </div>
                        }

                        {userType === 2 && currItem.due_amount === "0.00" &&
                            <div className="extra content" style={{ textAlign: "center" }}>
                                <span className="floated time" style={{ color: 'grey' }}>
                                    <div className={'mb-3'}>
                                        <b>{currItem.message}</b>
                                    </div>
                                </span>
                                <Button fluid attached='bottom'  color='grey'
                                onClick={() => {
                                    navigate('/payment/' + currItem.id)
                                }}>
                                    All Payment Cleared
                                </Button>
                            </div>
                        }

                    </div>
                ))}
            </div>
        </div>
    )
}

export default SingleDueCard
