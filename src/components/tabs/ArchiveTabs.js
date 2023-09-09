import React from 'react'
import {Tab} from 'semantic-ui-react'
import {ArchiveCompleted} from "../fragments/ArchiveCompleted";
import {ArchiveRejected} from "../fragments/ArchiveRejected";

const panes = [
    {
        menuItem: 'Completed Archive',
        render: () => <Tab.Pane attached={false}><ArchiveCompleted finished={true}/></Tab.Pane>,
    },
    {
        menuItem: 'Rejected Archive',
        render: () => <Tab.Pane attached={false}><ArchiveCompleted finished={false}/></Tab.Pane>,
    },

]


const ArchiveTabs = ({type}) => (
    <div className="row">
        {/*<div className="col-xs-0 col-sm-1 col-md-1"></div>*/}
        <Tab className="col-xs-12 col-sm-12 col-md-12" menu={{secondary: true, pointing: true}} panes={panes} defaultActiveIndex={type ? type : 0}/>
        {/*<div className="col-xs-0 col-sm-1 col-md-1"></div>*/}
    </div>

)

export default ArchiveTabs