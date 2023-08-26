import React from 'react'
import {Tab} from 'semantic-ui-react'
import {OfferedRequests} from "../fragments/OfferedRequests";

const panes = [
    {
        menuItem: 'Offered Request',
        render: () => <Tab.Pane attached={false}><OfferedRequests isOffered={true}/></Tab.Pane>,
    },
    {
        menuItem: 'Accepted Request',
        render: () => <Tab.Pane attached={false}><OfferedRequests isAccepted={true}/></Tab.Pane>,
    },

]


const RequestTabs = () => (

    <Tab className="col-xs-12 col-sm-12 col-md-12" menu={{secondary: true, pointing: true}} panes={panes}/>


)

export default RequestTabs