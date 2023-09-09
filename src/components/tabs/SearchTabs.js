import React, { useEffect } from 'react'
import { Tab } from 'semantic-ui-react'
import EstimationSearchList from '../cards/searchItems/EstimationSearchList';
import RequestSearchList from '../cards/searchItems/RequestSearchList';
import EmployeeSearchList from '../cards/searchItems/EmployeeSearchList';
import AgencySearchList from '../cards/searchItems/AgencySearchList';

const panes = [
    {
        menuItem: 'Estimations',
        render: ({ searchData }) => <Tab.Pane attached={false}> <EstimationSearchList searchData={searchData.estimation} /></Tab.Pane>,
    },

    {
        menuItem: 'Requests',
        render: ({ searchData }) => <Tab.Pane attached={false}><RequestSearchList searchData={searchData.request} /></Tab.Pane>,
    },

    // {
    //     menuItem: 'Agency',
    //     render: ({ searchData }) => <Tab.Pane attached={false}><AgencySearchList searchData={searchData.agency} /></Tab.Pane>,
    // },

    {
        menuItem: 'Employees',
        render: ({ searchData }) => <Tab.Pane attached={false}><EmployeeSearchList searchData={searchData.employee} /></Tab.Pane>,
    },


]


const SearchTabs = ({ searchData }) => {
    useEffect(() => {
        console.log(searchData)
    }, [])

    return (
        <Tab searchData={searchData} menu={{ secondary: true, pointing: true }} panes={panes} />
    )
}


export default SearchTabs