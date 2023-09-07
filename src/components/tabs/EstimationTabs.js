import React from 'react'
import {Tab} from 'semantic-ui-react'
import {ArchiveCompleted} from "../fragments/ArchiveCompleted";
import {ArchiveRejected} from "../fragments/ArchiveRejected";
import {EstimationsCompleted} from "../fragments/EstimationsCompleted";
import {EstimationsRejected} from "../fragments/EstimationsRejected";
import {EstimationsOngoing} from "../fragments/EstimationsOngoing";
import {Estimations} from "../fragments/Estimations";

const panes = [
    {
        menuItem: 'Ongoing Estimations',
        render: () => <Tab.Pane attached={false}><Estimations isOngoing={true} /></Tab.Pane>,
    },


]


const EstimationTabs = () => (

    <Tab className="col-xs-12 col-sm-12 col-md-12" menu={{secondary: true, pointing: true}} panes={panes}/>


)

export default EstimationTabs