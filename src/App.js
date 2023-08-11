import './App.css';
import React, {useState, useEffect} from "react";
import 'font-awesome/css/font-awesome.min.css';
import toast, {Toaster} from "react-hot-toast";
import {HomePage} from "./components/pages/HomePage";
import {Route, Routes} from "react-router-dom";
import {Dialog, DialogContent} from "@mui/material";
import {BarLoader} from "react-spinners";
import {LoginPage} from "./components/pages/LoginPage";
import {RegisterPage} from "./components/pages/RegisterPage";
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";


let showToast
let setLoading
let globalLoading

const cookies = new Cookies();

function App() {

    showToast = (message, toastType) => {
        if (toastType === "success") {
            toast.success(message);
        } else if (toastType === "error") {
            toast.error(message);
        }
    }

    const [loading, setL] = useState(false)
    setLoading = setL
    globalLoading = loading

    let navigate = useNavigate();

    useEffect(() => {
        // check cookies for logged in
        if (cookies.get("token") === undefined || cookies.get("token") == null) {
            showToast('You must log in to continue', 'error')
            navigate('/login')
        }

    }, []);

    return (
        <div>

            <Dialog PaperProps={{
                style: {
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                },
            }} open={loading}>
                <DialogContent>
                    <BarLoader
                        color={'#ffffff'}
                        loading={true}

                        size={150}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />

                </DialogContent>
            </Dialog>

            <Toaster />


            <Routes>
                <Route exact path="*" element={ <HomePage/>}/>
                <Route exact path="/login" element={<LoginPage/>}/>
                <Route exact path="/register" element={<RegisterPage/>}/>
            </Routes>




        </div>
    );
}

export default App;
export {showToast, setLoading, globalLoading};
