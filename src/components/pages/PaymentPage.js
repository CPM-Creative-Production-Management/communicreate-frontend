import React from 'react';
import {Message, Step} from "semantic-ui-react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Dashboard } from "../fragments/Dashboard";
import {Estimations} from "../fragments/Estimations";
import Fab from '@mui/material/Fab';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import "./pages.css"

const PaymentPage = () => {

    return (
        <div>

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
    )
}
export default PaymentPage
