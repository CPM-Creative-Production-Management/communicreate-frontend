import './App.css';
import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import toast, {Toaster} from "react-hot-toast";
import {HomePage} from "./components/pages/HomePage";
import AuthPage from "./components/pages/AuthPage";
import {Route, Routes} from "react-router-dom";
import {Dashboard} from "./components/fragments/Dashboard";
import {Archive} from "./components/fragments/Archive";
import {AddEstimationPage} from "./components/pages/AddEstimationPage";

let showToast

function App() {

    showToast = (message, toastType) => {
        if (toastType === "success") {
            toast.success(message);
        } else if (toastType === "error") {
            toast.error(message);
        }
    }

    return (
        <div>
            <Toaster />

            {/*check cookies for logged in*/}

            <Routes>
                <Route exact path="*" element={ <HomePage/>}/>
                <Route exact path="/auth" element={<AuthPage/>}/>
            </Routes>




        </div>
    );
}

export default App;
export {showToast};
