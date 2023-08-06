import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {Button, Dropdown} from "semantic-ui-react";
import {SiAntdesign} from "react-icons/si";
import {useNavigate} from "react-router-dom";
import Cookies from "universal-cookie";
import {showToast} from "../App";

// need these for redux
import {useSelector, useDispatch} from "react-redux";
import {useEffect, useState} from "react";

function NavScrollExample() {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [userName, setUserName] = useState('')
    const [userAssociation, setUserAssociation] = useState('')

    useEffect(() => {
        setUserName(cookies.get('userName'))
        setUserAssociation((cookies.get('userAssoc')))
    }, []);



    const logout = () => {
        cookies.remove('token');
        showToast('Logged out successfully', 'success');
        navigate('/login');
    }

    // get the state from redux store
    const userProfile = useSelector(state => state.userProfile)
    // dispatch an action to the reducer
    const dispatch = useDispatch()

    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>

                <Navbar.Brand className='ms-4'><SiAntdesign size='1.5em' className='me-2'/>Creative Production
                    Management</Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >

                    </Nav>


                    <Form className="d-flex">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
                    </Form>

                    <Button className='ms-3' icon={'bell outline'}/>




                    <Dropdown pointing
                              text={userName}
                              icon='user circle'
                              floating
                              labeled
                              button
                              className='icon'
                    >
                        <Dropdown.Menu>

                            <center>
                                <Dropdown.Item className='m-3' text={userAssociation}/>
                            </center>


                            <Dropdown.Divider/>
                            <Dropdown.Item icon='user circle' text='Your Account' onClick={() => {
                                // navigate("profile/")
                            }
                            }/>
                            <Dropdown.Item icon='tag' text='Leads'/>

                            <Dropdown.Divider/>
                            <Dropdown.Item onClick={logout} icon='log out' color='red' text='Logout'/>
                        </Dropdown.Menu>
                    </Dropdown>


                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;