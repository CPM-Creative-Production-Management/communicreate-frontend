import React, {useEffect} from 'react';
import ResponsiveNavbar from '../utils/ResponsiveNavbar';
import {SidebarPro} from "../utils/SidebarPro";
import {Route, Routes, useNavigate} from "react-router-dom";
import {Dashboard} from "../fragments/Dashboard";
import {Archive} from "../fragments/Archive";

import {Button, Card, Icon, Input} from "semantic-ui-react";
import Fab from '@mui/material/Fab';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import "./pages.css"
import {AddEstimationPage} from "./agency/AddEstimationPage";
import {Estimations} from "../fragments/Estimations";
import PaymentPage from "./agency/PaymentPage";
import MyEmployeesPage from './agency/MyEmployeesPage';

import AddEmployeePage from './agency/AddEmployeePage';

import Cookies from "universal-cookie";
import {showToast} from "../../App";
import ClientDashboard from './client/ClientDashboard';
import {SidebarClient} from  '../utils/SidebarClient'
import AddRequestPage from './client/AddRequestPage';
import MyRequestsPage from './client/MyRequestsPage';
import Requests from "./agency/Requests";
import ResponsePage from './client/ResponsePage';

const cookies = new Cookies();


export const HomePage = () => {

    const [userType, setUserType] = React.useState(1);

    useEffect(() => {
        if (cookies.get("userType") === '1'){
            setUserType(1)
        } else if (cookies.get("userType") === '2'){
            setUserType(2)
        }
    }, []);

    return (
        <div>
            <ResponsiveNavbar/>
            

            <div className="row">
                <div className="col-xs-1 col-sm-1 col-md-2">{ userType === 1 ? <SidebarClient /> : <SidebarPro />}</div>

                <div className="col-xs-11 col-sm-11 col-md-10">
                    <div className="me-5">

                    <Routes>
                        {userType === 1? 
                            <Route exact path="/" element={<ClientDashboard/>}/> : 
                            <Route exact path="/" element={<Dashboard/>}/>
                        }
                        
                        <Route exact path="/archive" element={<Archive/>}/>
                        <Route exact path="/requests" element={<Requests/>}/>
                        <Route exact path="/estimations" element={<Estimations/>}/>
                        <Route exact path="/add-estimation/:id" element={<AddEstimationPage/>}/>
                        <Route exact path="/my-employees" element={<MyEmployeesPage/>}/>
                        <Route exact path="/payment" element={<PaymentPage/>}/>
                        <Route exact path="/add-employee" element={<AddEmployeePage/>}/>

                        <Route exact path="/new-request" element={<AddRequestPage/>}/>
                        <Route exact path="/my-requests" element={<MyRequestsPage/>}/>
                        <Route exact path="/estimation/:id" element={<ResponsePage/>}/>
                    </Routes>

                     
                    </div>
                </div>


            </div>
        </div>
    );
}