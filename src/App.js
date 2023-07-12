import './App.css';
import React from "react";
import 'font-awesome/css/font-awesome.min.css';
import {Toaster} from "react-hot-toast";
import {HomePage} from "./components/pages/HomePage";
import AuthPage from "./components/pages/AuthPage";


function App() {
    return (
        <div>
            <Toaster />

            {/*<HomePage/>*/}
            <AuthPage/>

        </div>
    );
}

export default App;
