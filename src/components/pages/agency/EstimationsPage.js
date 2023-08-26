import React from 'react';
import ArchiveTabs from "../../tabs/ArchiveTabs";
import EstimationTabs from "../../tabs/EstimationTabs";
import { Button, Icon } from "semantic-ui-react";

import { showToast } from "../../../App";

import { useNavigate } from "react-router-dom";

export const EstimationsPage = () => {

    const navigate = useNavigate()


    return (
        <div>
            <br />
            <center>
                <h1>Estimations</h1>
            </center>

            <EstimationTabs />
            <br/>

        </div>
    );
}