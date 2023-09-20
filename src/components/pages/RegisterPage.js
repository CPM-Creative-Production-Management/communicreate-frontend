import React, {useEffect} from 'react';


import RegImg from '../../assets/create_account.svg'
import {Button, Input, Form, Dropdown, Message} from "semantic-ui-react";
import {showToast} from "../../App";
import {useNavigate} from "react-router-dom";
import Radio from '@mui/material/Radio';
import {useApiRequest} from "../api/useApiRequest";
import {base_url} from "../../index";
import axios from "axios";
import {SiAntdesign} from "react-icons/si";

import './pages.css'


export const RegisterPage = () => {
    const navigate = useNavigate();

    const emailRef = React.useRef('');
    const passwordRef = React.useRef('');
    const confirmPasswordRef = React.useRef('');
    const nameRef = React.useRef('');


    const [associationType, setAssociationType] = React.useState('1');
    const [associatedId, setAssociatedId] = React.useState(null);

    const handleChange = (event) => {
        setAssociationType(event.target.value);
    };

    const validateEmail = (email) => {
        let re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const register = () => {
        // check for valid email (regex)
        let password = passwordRef.current.inputRef.current.value;
        let email = emailRef.current.inputRef.current.value
        let confirmPassword = confirmPasswordRef.current.inputRef.current.value


        if (email.length === 0 || !validateEmail(email)) {
            showToast("Please enter a valid email", "error")
            return
        } else if (password.length < 5) {
            console.log("Password must be at least 5 characters long")
            showToast("Password must be at least 5 characters long", "error")
            return
        } else if (password !== confirmPassword) {
            console.log("passwords do not match")
            showToast("passwords do not match", "error")
            return
        }

        const registerBody = {
            name: nameRef.current.inputRef.current.value,
            email: emailRef.current.inputRef.current.value,
            password: passwordRef.current.inputRef.current.value,
            type: associationType,
            associatedId: associatedId,

        }

        // console.log('reg body', registerBody)


        axios.post(base_url + 'account/signup', registerBody).then((res) => {
            console.log(res)
            showToast("Account created successfully, please check mail for verification link", "success")
            navigate('/login')

        }).catch((err) => {
            console.log(err)
            showToast("Account creation failed", "error")
        })


    }

    const {data: companyOptions, loading: companyLoading, error: companyErr} = useApiRequest({
        url: base_url + 'company',
        method: 'GET',
    })

    const {data: agencyOptions, loading: agencyLoading, error: agencyErr} = useApiRequest({
        url: base_url + 'agency',
        method: 'GET',
    })

    useEffect(() => {
        console.log('companyOptions', companyOptions)
        console.log('agencyOptions', agencyOptions)
    }, [companyOptions, agencyOptions]);


    return (
        <div className={'row'}>

            <center>
                <br/>
                <br/>

                <center>
                    <SiAntdesign className='mt-3' size="10em"/>
                    <br/>
                    <h1>
                        Welcome to CommuniCreate</h1>
                </center>
                <div className={'col-xs-11 col-sm-3 col-md-3 mb-4 mt-5'}>
                    <center>
                        <h2>Create a new Account</h2>
                    </center>


                    <Input iconPosition={'left'} icon={'pencil alternate'} required ref={nameRef} type='text'
                           className='mt-4'
                           fluid
                           size='large' placeholder='Full Name'/>


                    <Message>
                        <div className={'align-left'}>

                            <div>

                                <Radio
                                    label='Company Client'
                                    name='radioGroup'
                                    value='1'
                                    checked={associationType === '1'}
                                    onChange={handleChange}
                                /> Company Client
                            </div>


                            <div>
                                <Radio
                                    label='Agency Manager'
                                    name='radioGroup'
                                    value='2'
                                    checked={associationType === '2'}
                                    onChange={handleChange}
                                /> Agency Manager
                            </div>
                        </div>
                    </Message>


                    {associationType === '1' ?
                        <Dropdown
                            className='mt-3'
                            placeholder='Select Your Company'
                            fluid
                            search
                            selection
                            onChange={(e, data) => {
                                console.log('selected', data.value)
                                setAssociatedId(data.value)

                            }}
                            options={companyOptions}
                        /> :
                        <Dropdown
                            className='mt-3'
                            placeholder='Select Your Agency'
                            fluid
                            onChange={(e, data) => {
                                console.log('selected', data.value)
                                setAssociatedId(data.value)

                            }}
                            search
                            selection
                            options={agencyOptions}
                        />
                    }


                    <Input iconPosition={'left'} icon={'mail'} required ref={emailRef} type='email' className='mt-3'
                           fluid
                           size='large' placeholder='Email'/>
                    <Input iconPosition={'left'} icon={'lock'} required ref={passwordRef} className='mt-3' fluid
                           size='large'
                           placeholder='Choose a Password'
                           type='password'/>

                    <Input iconPosition={'left'} icon={'sync alternate'} required ref={confirmPasswordRef}
                           className='mt-3'
                           fluid size='large'
                           placeholder='Confirm Password'
                           type='password'/>

                    <Button onClick={() => {
                        register()
                    }} primary className='mt-3' size='large' fluid>Register</Button>

                    <br/>

                    Already have an account?
                    <a className={'link-text'} onClick={() => {
                        navigate('/login')
                    }}>&nbsp;&nbsp; Login</a>

                    <br/>
                    <br/>

                </div>
            </center>

        </div>
    )
}
