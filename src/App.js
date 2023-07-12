import './App.css';
import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import toast, {Toaster} from "react-hot-toast";
import {HomePage} from "./components/pages/HomePage";
import AuthPage from "./components/pages/AuthPage";

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

            <HomePage/>
            {/*<AuthPage/>*/}

        </div>
    );
}

export default App;
export {showToast};
