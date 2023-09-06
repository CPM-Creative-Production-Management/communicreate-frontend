import React, {useEffect} from 'react';
import ResponsiveNavbar from '../utils/ResponsiveNavbar';
import {SidebarAgency} from "../utils/SidebarAgency";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "../fragments/Dashboard";
import {Archive} from "../fragments/Archive";
import "./pages.css"
import {AddEstimationPage} from "./agency/AddEstimationPage";
import {EstimationsPage} from "./agency/EstimationsPage";
import MyEmployeesPage from './agency/MyEmployeesPage';
import AddEmployeePage from './agency/AddEmployeePage';

import Cookies from "universal-cookie";
import ClientDashboard from './client/ClientDashboard';
import {SidebarClient} from  '../utils/SidebarClient'
import AddRequestPage from './client/AddRequestPage';
import MyRequestsPage from './client/MyRequestsPage';
import RequestPage from "./agency/RequestPage";
// import ResponsePage from './client/ResponsePage';
import FinalizePage from './client/FinalizePage';
import EstimationPage from './client/EstimationPage';
import AgenciesPage from './client/AgenciesPage';
import AgencyPage from './client/AgencyPage';

import DuesPage from './DuesPage';
import PaymentPage from './PaymentPage';
import ProfilePage from './ProfilePage';

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
            <br />
            <br />

            <div className="row pe-4">
                <div className="col-xs-1 col-sm-1 col-md-2">{ userType === 1 ? <SidebarClient /> : <SidebarAgency />}</div>
                <div className="col-xs-11 col-sm-10 col-md-10">

                    <Routes >
                        {userType === 1? 
                            <Route exact path="/" element={<ClientDashboard/>}/> : 
                            <Route exact path="/" element={<Dashboard/>}/>
                        }
                        
                        <Route exact path="/archive" element={<Archive/>}/>
                        <Route exact path="/requests" element={<RequestPage/>}/>
                        <Route exact path="/estimations" element={<EstimationsPage/>}/>
                        <Route exact path="/add-estimation/:id" element={<AddEstimationPage edit={false}/>}/>
                        <Route exact path="/edit-estimation/:id" element={<AddEstimationPage edit={true}/>}/>
                        <Route exact path="/my-employees" element={<MyEmployeesPage/>}/>
                        {/* <Route exact path="/payment" element={<PaymentPage/>}/> */}
                        <Route exact path="/add-employee" element={<AddEmployeePage/>}/>

                        <Route exact path="/new-request" element={<AddRequestPage/>}/>
                        <Route exact path="/my-requests" element={<MyRequestsPage/>}/>
                        {/*<Route exact path="/estimation/:id" element={<ResponsePage/>}/>*/}

                        {
                            userType === 1 ?
                                <Route exact path="/request/:rid/agency/:aid/finalize" element={<FinalizePage/>}/> : null
                        }
                        <Route exact path="/payment/:id" element={<PaymentPage/>}/>
                        <Route exact path="/dues" element={<DuesPage/>}/>
                        <Route exact path="/request/:rid/agency/:aid/estimation" element={<EstimationPage/>}/>
                        <Route exact path="/agencies" element={<AgenciesPage/>} />
                        <Route exact path="/agency/:id" element={<AgencyPage/>}/>

                        <Route exact path="/profile" element={<ProfilePage/>}/>
                    </Routes>



                </div>



            </div>
        </div>
    );
}