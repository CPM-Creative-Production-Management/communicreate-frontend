import React from 'react';


import RegImg from '../../assets/create_account.svg'
import {Button, Input, Form, Dropdown} from "semantic-ui-react";
import {showToast} from "../../App";
import {useNavigate} from "react-router-dom";
import Radio from '@mui/material/Radio';
import {FormControl, FormLabel, RadioGroup} from "@mui/material";

export const RegisterFragment = () => {
    const navigate = useNavigate();

    const emailRef = React.useRef('');
    const passwordRef = React.useRef('');
    const confirmPasswordRef = React.useRef('');
    const nameRef = React.useRef('');

    const [companyType, setCompanyType] = React.useState('1');

    const handleChange = (event) => {
        setCompanyType(event.target.value);
    };


    const validateEmail = (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const register = () => {
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

        navigate('/');

    }

    const companyOptions = [
        {key: 'Azitech', text: 'Azitech Soft Ltd.'},
        {key: 'B', text: 'B Soft Ltd.'},
        {key: 'C', text: 'C Soft Ltd.'},

    ]

    return (
        <div className={'ms-3 me-3'}>
            <h3>Create a new Account</h3>
            <br/>

            <img width='50%' src={RegImg} alt="RegImg"/>

            <Input iconPosition={'left'} icon={'pencil alternate'} required ref={nameRef} type='text' className='mt-5'
                   fluid
                   size='large' placeholder='Full Name'/>


            <Radio
                label='Company Client'
                name='radioGroup'
                value='1'
                checked={companyType === '1'}
                onChange={handleChange}
            /> Company Client


            <Radio
                label='Agency Manager'
                name='radioGroup'
                value='2'
                checked={companyType === '2'}
                onChange={handleChange}
            /> Agency Manager


            <Dropdown
                className='mt-3'
                placeholder='Select Your Company'
                fluid
                search
                selection
                options={companyOptions}
            />

            <Input iconPosition={'left'} icon={'mail'} required ref={emailRef} type='email' className='mt-3' fluid
                   size='large' placeholder='Email'/>
            <Input iconPosition={'left'} icon={'lock'} required ref={passwordRef} className='mt-3' fluid size='large'
                   placeholder='Choose a Password'
                   type='password'/>

            <Input iconPosition={'left'} icon={'sync alternate'} required ref={confirmPasswordRef} className='mt-3'
                   fluid size='large'
                   placeholder='Confirm Password'
                   type='password'/>

            <Button onClick={() => {
                register()
            }} positive className='mt-3' size='large' fluid>Register</Button>

            <br/>


        </div>
    )
}
