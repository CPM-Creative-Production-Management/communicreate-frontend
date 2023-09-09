import React from 'react';
import ArchiveTabs from "../../tabs/ArchiveTabs";
import EstimationTabs from "../../tabs/EstimationTabs";
import { Button, Icon } from "semantic-ui-react";

import { showToast } from "../../../App";

import { useNavigate } from "react-router-dom";
import { Estimations } from '../../fragments/Estimations';

export const EstimationsPage = () => {

    const navigate = useNavigate()


    return (
        <div>
            
            <center>
                <h1>Projects</h1>
                <br />
            </center>
            {/* <EstimationTabs /> */}
            <Estimations  isOngoing={true} />
            <br/>

        </div>
    );
}