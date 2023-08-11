import React from 'react'
import {Tab} from 'semantic-ui-react'
import {ArchiveCompleted} from "../fragments/ArchiveCompleted";
import {ArchiveRejected} from "../fragments/ArchiveRejected";
import {OfferedRequests} from "../fragments/OfferedRequests";
import {AcceptedRequests} from "../fragments/AcceptedRequests";

const panes = [
    {
        menuItem: 'Offered Requests',
        render: () => <Tab.Pane attached={false}><OfferedRequests/></Tab.Pane>,
    },
    {
        menuItem: 'Accepted Requests',
        render: () => <Tab.Pane attached={false}><AcceptedRequests/></Tab.Pane>,
    },

]


const RequestTabs = () => (
    <div className="row">
        {/*<div className="col-xs-0 col-sm-1 col-md-1"></div>*/}
        <Tab className="col-xs-12 col-sm-12 col-md-12" menu={{secondary: true, pointing: true}} panes={panes}/>
        {/*<div className="col-xs-0 col-sm-1 col-md-1"></div>*/}
    </div>

)

export default RequestTabs