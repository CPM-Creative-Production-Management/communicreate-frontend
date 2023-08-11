import React from 'react'
import {Tab} from 'semantic-ui-react'
import {ArchiveCompleted} from "../fragments/ArchiveCompleted";
import {ArchiveRejected} from "../fragments/ArchiveRejected";
import {EstimationsCompleted} from "../fragments/EstimationsCompleted";
import {EstimationsRejected} from "../fragments/EstimationsRejected";
import {EstimationsOngoing} from "../fragments/EstimationsOngoing";

const panes = [
    {
        menuItem: 'Ongoing Estimations',
        render: () => <Tab.Pane attached={false}><EstimationsOngoing/></Tab.Pane>,
    },
    {
        menuItem: 'Completed Estimations',
        render: () => <Tab.Pane attached={false}><EstimationsCompleted/></Tab.Pane>,
    },
    {
        menuItem: 'Rejected Estimations',
        render: () => <Tab.Pane attached={false}><EstimationsRejected/></Tab.Pane>,
    },

]


const EstimationTabs = () => (
    <div className="row">
        {/*<div className="col-xs-0 col-sm-1 col-md-1"></div>*/}
        <Tab className="col-xs-12 col-sm-12 col-md-12" menu={{secondary: true, pointing: true}} panes={panes}/>
        {/*<div className="col-xs-0 col-sm-1 col-md-1"></div>*/}
    </div>

)

export default EstimationTabs