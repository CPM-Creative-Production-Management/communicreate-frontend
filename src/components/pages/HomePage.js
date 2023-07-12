import React from 'react';
import ResponsiveNavbar from "../ResponsiveNavbar";
import {CollapsibleSidebar} from "../CollapsibleSidebar";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "../fragments/Dashboard";
import {Archive} from "../fragments/Archive";

export const HomePage = () => {

        return (
            <div>
                <ResponsiveNavbar/>

                <div className="row">
                    <div className="col-sm-2 col-md-2"><CollapsibleSidebar/></div>

                    <div className="col-sm-10 col-md-10">
                        <Routes>
                            <Route exact path="/" element={<Dashboard/>}/>
                            <Route exact path="/archive" element={<Archive/>}/>

                        </Routes>
                    </div>

                </div>
            </div>
        );
}