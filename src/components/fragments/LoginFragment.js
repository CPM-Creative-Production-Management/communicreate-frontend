import React from 'react';
import LoginImg from '../../assets/login.svg'
import {Button} from "semantic-ui-react";
import {useNavigate} from "react-router-dom";

export const LoginFragment = () => {
    const navigate = useNavigate();

    return(
    <div>
        <h3>Login to your Account</h3>
        <br/>
        <img width='60%' src={LoginImg} alt="LoginImg" />

        <Button onClick={()=>{navigate('/')}} positive className='mt-5' size='large' fluid>Login</Button>

    </div>
)
}
