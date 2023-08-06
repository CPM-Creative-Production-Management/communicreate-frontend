import React from 'react';
import ArchiveTabs from "../tabs/ArchiveTabs";
import EstimationTabs from "../tabs/EstimationTabs";
import { Button, Icon } from "semantic-ui-react";

import { showToast } from "../../App";

import { useNavigate } from "react-router-dom";

export const Estimations = () => {

    const navigate = useNavigate()

    const finalizeEstimation = () => {
        navigate('/payment')
    }

    return (
        <div>
            <br />
            <center>
                <h1>Estimations</h1>
            </center>

            <EstimationTabs />
            <br/>
            <Button onClick={finalizeEstimation} positive animated>
                <Button.Content visible>Continue To Payment</Button.Content>
                <Button.Content hidden>
                    <Icon name='finalizeEstimation' />
                </Button.Content>
            </Button>
        </div>
    );
}