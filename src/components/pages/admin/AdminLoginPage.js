import React from 'react';
import {Button, Input} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import {showToast} from "../../../App";
import {AdminLoginReq} from "../../api/adminLoginReq";
import {useDispatch} from "react-redux";
import {SiAntdesign} from "react-icons/si";


export const AdminLoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()


    const emailRef = React.useRef('');
    const passwordRef = React.useRef('');

    const validateEmail = (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const login = () => {
        // check for valid email (regex)
        let password = passwordRef.current.inputRef.current.value;
        let email = emailRef.current.inputRef.current.value

        console.log('email', email)
        console.log('password', password)

        if (email.length === 0 || !validateEmail(email)) {
            showToast("Please enter a valid email", "error")
            return
        } else if (password.length < 5) {
            console.log("Password must be at least 5 characters long")
            showToast("Password must be at least 5 characters long", "error")
            return
        }

        const loginBody = {
            email: email,
            password: password
        }

        AdminLoginReq(loginBody, navigate, dispatch)

    }

    return (
        <div className={'row'}>

            <center>
                <br/>
                <br/>
                <br/>

                <center>
                    <SiAntdesign className='mt-3' size="10em"/>
                    <br/>
                    <h1>
                        CommuniCreate Admin Panel</h1>
                </center>
                <div className={'col-xs-12 col-sm-3 col-md-3 mb-4 mt-5'}>

                    <center>
                        <h2>Login to your account</h2>
                    </center>


                    <Input iconPosition={'left'} icon={'mail'} required ref={emailRef} type='email' className='mt-4'
                           fluid
                           size='large' placeholder='Email'/>
                    <Input iconPosition={'left'} icon={'lock'} required ref={passwordRef} className='mt-3' fluid
                           size='large'
                           placeholder='Password'
                           type='password'/>

                    <Button onClick={() => {
                        login()
                    }} primary className='mt-3' size='large' fluid>Login</Button>

                    <br/>
                </div>


            </center>


        </div>


    )
}