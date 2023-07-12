import React from 'react'
import {
    Button,
    Divider,
    Grid,
    Header,
    Icon,
    Search,
    Segment,
} from 'semantic-ui-react'
import {LoginFragment} from "../fragments/LoginFragment";
import {SiAntdesign} from "react-icons/si";

const AuthPage = () => (
    <div>
        <center>



        <SiAntdesign className='mt-5' size="10em"/>
            <br/>
            <h2>
            Welcome to Creative Production Management</h2>

        </center>
        <Segment className='m-5 me-5' secondary >
            <Grid columns={2} stackable textAlign='center'>
                <Divider vertical>Or</Divider>

                <Grid.Row verticalAlign='middle'>
                    <Grid.Column>

                        <LoginFragment/>

                        <Search placeholder='Search countries...'/>
                    </Grid.Column>

                    <Grid.Column>
                        <Header icon>
                            <Icon name='world'/>
                            Add New Country
                        </Header>
                        <br/>
                        <Button primary>Create</Button>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment>
    </div>
)

export default AuthPage