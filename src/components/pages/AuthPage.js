import React from 'react'
import {
    Divider,
    Grid,
    Segment,
} from 'semantic-ui-react'
import {LoginFragment} from "../fragments/LoginFragment";
import {SiAntdesign} from "react-icons/si";
import {RegisterFragment} from "../fragments/RegisterFragment";



const AuthPage = () => (
    <div>
        <div className="row">
            <div className="col-xs-0 col-sm-2 col-md-2"></div>
            <div className="col-xs-12 col-sm-8 col-md-8">

                <center>
                    <SiAntdesign className='mt-5' size="10em"/>
                    <br/>
                    <h1>
                        Welcome to Creative Production Management</h1>
                </center>

                <Segment className='m-5 me-5' secondary >
                    <Grid columns={2} stackable textAlign='center'>
                        <Divider vertical>Or</Divider>

                        <Grid.Row verticalAlign='middle'>
                            <Grid.Column>

                                <LoginFragment/>


                            </Grid.Column>

                            <Grid.Column>
                                <RegisterFragment/>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Segment>
            </div>

            <div className="col-xs-0 col-sm-2 col-md-2"></div>
        </div>


    </div>
)

export default AuthPage