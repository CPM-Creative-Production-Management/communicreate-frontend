import './App.css';
import {CollapsibleSidebar} from './components/CollapsibleSidebar';
import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import ResponsiveNavbar from "./components/ResponsiveNavbar";
import {Dashboard} from "./components/fragments/Dashboard";
import {Route, Routes} from "react-router-dom";
import {Archive} from "./components/fragments/Archive";
import {Toaster} from "react-hot-toast";


function App() {
    return (
        <div>
            <Toaster />
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

export default App;
