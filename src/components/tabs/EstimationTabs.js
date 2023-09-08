import React from 'react'
import {Tab} from 'semantic-ui-react'
import {Estimations} from "../fragments/Estimations";

const panes = [
    {
        menuItem: 'Ongoing Estimations',
        render: ({data}) => <Tab.Pane attached={false}><Estimations data={data} isOngoing={true} /></Tab.Pane>,
    },


]


const EstimationTabs = ({data}) => (
    // send the data to one of the tabs
    // <div className="row">
    //     {/*<div className="col-xs-0 col-sm-1 col-md-1"></div>*/}
    //     <Tab className="col-xs-12 col-sm-12 col-md-12" menu={{secondary: true, pointing: true}} panes={panes}/>
    //     {/*<div className="col-xs-0 col-sm-1 col-md-1"></div>*/}
    // </div>




    <Tab data={data} className="col-xs-12 col-sm-12 col-md-12" menu={{secondary: true, pointing: true}} panes={panes}/>


)

export default EstimationTabs