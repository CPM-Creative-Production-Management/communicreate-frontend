import React, { useEffect } from 'react'
import { Tab } from 'semantic-ui-react'
import { Estimations } from "../fragments/Estimations";
import TestList from '../cards/searchItems/TestList';
import EstimationSearchList from '../cards/searchItems/EstimationSearchList';

const panes = [
    {
        menuItem: 'Estimations',
        render: ({ searchData }) => <Tab.Pane attached={false}>{searchData.estimation.length>0 && <EstimationSearchList searchData={searchData.estimation} />}</Tab.Pane>,
    },

    {
        menuItem: 'Requests',
        render: ({ searchData }) => <Tab.Pane attached={false}>{searchData.request.length>0 && <EstimationSearchList searchData={searchData.request} />}</Tab.Pane>,
    },

    {
        menuItem: 'Agency',
        render: ({ searchData }) => <Tab.Pane attached={false}>{searchData.agency.length>0 && <EstimationSearchList searchData={searchData.agency} />}</Tab.Pane>,
    },

    {
        menuItem: 'Employees',
        render: ({ searchData }) => <Tab.Pane attached={false}>{searchData.employee.length>0 && <EstimationSearchList searchData={searchData.employee} />}</Tab.Pane>,
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