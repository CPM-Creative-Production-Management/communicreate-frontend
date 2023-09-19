import React, { useEffect } from 'react';
import ResponsiveNavbar from '../utils/ResponsiveNavbar';
import { SidebarAgency } from "../utils/SidebarAgency";
import { Route, Routes } from "react-router-dom";
import { Dashboard } from "../fragments/Dashboard";
import { Archive } from "../fragments/Archive";
import "./pages.css"

import { AdminDashboard } from "./admin/AdminDashboard";
import { SidebarAdmin } from "../utils/SidebarAdmin";

import { AddEstimationPage } from "./agency/AddEstimationPage";
import { EstimationsPage } from "./agency/EstimationsPage";
import MyEmployeesPage from './agency/MyEmployeesPage';
import AddEmployeePage from './agency/AddEmployeePage';
import EmployeePage from './agency/EmployeePage';

import Cookies from "universal-cookie";
import ClientDashboard from './client/ClientDashboard';
import { SidebarClient } from '../utils/SidebarClient'
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
import CompletedProjects from './client/CompletedProjects';
import Notifications from './Notifications';
import SearchPage from './SearchPage';
import VerifyPage from './VerifyPage';
import { showToast } from '../../App';
import { useNavigate } from 'react-router-dom';

const cookies = new Cookies();


export const HomePage = () => {

    const [userType, setUserType] = React.useState(1);
    const navigate = useNavigate()

    useEffect(() => {
        if (cookies.get("userType") === '1') {
            setUserType(1)
        } else if (cookies.get("userType") === '2') {
            setUserType(2)
        } else if (cookies.get("userType") === '3') {
            setUserType(3)
        }
    }, []);

    console.log("userType is : ", userType)

    return (
        <div>

            <ResponsiveNavbar />

            <br />
            <br />

            <div className="row pe-4">
                <div className="col-xs-1 col-sm-1 col-md-2">{
                    userType === 1 ? (
                        <SidebarClient />
                    ) : userType === 2 ? (
                        <SidebarAgency />
                    ) : userType === 3 ? (
                        <SidebarAdmin />
                    ) : null
                }
                </div>
                <div className="col-xs-11 col-sm-10 col-md-10">

                    <Routes >
                        {cookies.get('token') && (
                            userType === 1 ? (
                                <Route exact path="/" element={<ClientDashboard />} />
                            ) : userType === 2 ? (
                                <Route exact path="/" element={<Dashboard />} />
                            ) : userType === 3 ? (
                                <Route exact path="/" element={<AdminDashboard />} />
                            ) : null
                        )}

                        <Route exact path="/archive" element={<Archive />} />
                        <Route exact path="/requests" element={<RequestPage />} />
                        <Route exact path="/estimations" element={<EstimationsPage />} />
                        <Route exact path="/add-estimation/:id" element={<AddEstimationPage edit={false} />} />
                        <Route exact path="/edit-estimation/:id" element={<AddEstimationPage edit={true} />} />
                        <Route exact path="/my-employees" element={<MyEmployeesPage />} />
                        <Route exact path="/employee/:id" element={<EmployeePage />} />
                        {/* <Route exact path="/payment" element={<PaymentPage/>}/> */}
                        <Route exact path="/add-employee" element={<AddEmployeePage />} />

                        <Route exact path="/new-request" element={<AddRequestPage />} />
                        <Route exact path="/my-requests" element={<MyRequestsPage />} />
                        {/*<Route exact path="/estimation/:id" element={<ResponsePage/>}/>*/}

                        {
                            userType === 1 ?
                                <Route exact path="/request/:rid/agency/:aid/finalize" element={<FinalizePage />} /> : null
                        }
                        <Route exact path="/payment/:id" element={<PaymentPage />} />
                        <Route exact path="/dues" element={<DuesPage />} />
                        <Route exact path="/request/:rid/agency/:aid/estimation" element={<EstimationPage />} />
                        <Route exact path="/agencies" element={<AgenciesPage />} />
                        <Route exact path="/agency/:id" element={<AgencyPage />} />
                        <Route exact path="/completed-projects" element={<CompletedProjects finished={true} />} />
                        <Route exact path="/rejected-projects" element={<CompletedProjects finished={false} />} />
                        <Route exact path="/ongoing-projects" element={<CompletedProjects ongoing={true} />} />
                        <Route exact path="/profile" element={<ProfilePage />} />

                        <Route exact path="/notifications" element={<Notifications />} />

                        <Route exact path="/search" element={<SearchPage />} />
                    </Routes>



                </div>



            </div>
        </div>
    );
}