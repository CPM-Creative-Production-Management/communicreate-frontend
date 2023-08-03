import React from 'react';
import LoginImg from '../../assets/login.svg'
import {Button, Input} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";
import {showToast} from "../../App";
import {LoginReq} from "../api/loginReq";

export const LoginFragment = () => {
    const navigate = useNavigate();

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
            username: email,
            password: password
        }

        LoginReq(loginBody, navigate)

    }

    return (

        <div className={'ms-3 me-3'}>
            <h3>Login to your Account</h3>
            <br/>
            <img width='60%' src={LoginImg} alt="LoginImg"/>


            <Input iconPosition={'left'} icon={'mail'} required ref={emailRef} type='email' className='mt-5' fluid
                   size='large' placeholder='Email'/>
            <Input iconPosition={'left'} icon={'lock'} required ref={passwordRef} className='mt-3' fluid size='large'
                   placeholder='Password'
                   type='password'/>

            <Button onClick={() => {
                login()
            }} positive className='mt-3' size='large' fluid>Login</Button>

            <br/>

        </div>
    )
}