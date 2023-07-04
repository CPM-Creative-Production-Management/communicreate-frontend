import React from 'react'
import {Tab} from 'semantic-ui-react'
import {ArchiveCompleted} from "../fragments/ArchiveCompleted";
import {ArchiveRejected} from "../fragments/ArchiveRejected";

const panes = [
    {
        menuItem: 'Completed Archives',
        render: () => <Tab.Pane attached={false}><ArchiveCompleted/></Tab.Pane>,
    },
    {
        menuItem: 'Rejected Archives',
        render: () => <Tab.Pane attached={false}><ArchiveRejected/></Tab.Pane>,
    },

]


const ArchiveTabs = () => (
    <div className="row">
        <div className="col-xs-0 col-sm-1 col-md-1"></div>
        <Tab className="col-xs-12 col-sm-10 col-md-10" menu={{secondary: true, pointing: true}} panes={panes}/>
        <div className="col-xs-0 col-sm-1 col-md-1"></div>
    </div>

)

export default ArchiveTabs