import React from 'react'
import {Tab} from 'semantic-ui-react'
import {OfferedRequests} from "../fragments/OfferedRequests";

const panes = [
    {
        menuItem: 'Offered Requests',
        render: () => <Tab.Pane attached={false}><OfferedRequests isOffered={true}/></Tab.Pane>,
    },
    {
        menuItem: 'Accepted Requests',
        render: () => <Tab.Pane attached={false}><OfferedRequests isAccepted={true}/></Tab.Pane>,
    },
    

]


const RequestTabs = () => (

    <Tab menu={{secondary: true, pointing: true}} panes={panes}/>


)

export default RequestTabs