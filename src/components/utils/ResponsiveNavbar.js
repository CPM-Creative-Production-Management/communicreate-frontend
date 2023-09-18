import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { Button, Dropdown, Input } from "semantic-ui-react";
import { SiAntdesign } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { showToast } from "../../App";

// need these for redux
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import SingleNotification from '../cards/SingleNotification';
import { NotificationDropdown } from './NotificatonDropdown';

import ModalExampleModal from './SearchModal';
import SearchModal from './SearchModal';
import { regularApiRequest } from '../api/regularApiRequest';
import { base_url } from '../..';

function NavScrollExample() {
    const cookies = new Cookies();
    const navigate = useNavigate();

    const [userType, setUserType] = useState(cookies.get('userType'));

    const [showNotifications, setShowNotifications] = useState(false);

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


    const [openSearchModal, setOpenSearchModal] = useState(false);





    return (
        <Navbar expand="lg" className="bg-body-tertiary nav-style pt-3">
            <Container fluid>
                <br />

                <Navbar.Brand className='ms-4'><SiAntdesign size='1.5em' className='me-2' />CommuniCreate</Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >

                    </Nav>



                    {userType === '2' &&
                        <Input disabled={openSearchModal} onClick={() => { setOpenSearchModal(true) }} loading={false} placeholder='Search...' />
                    }
                    <SearchModal open={openSearchModal} setOpen={setOpenSearchModal} />

                    {cookies.get('token') &&
                        <NotificationDropdown />
                    }




                    <Dropdown pointing
                        text={userName}
                        icon='user circle'
                        floating
                        labeled
                        button
                        className='icon'
                    >
                        <Dropdown.Menu >

                            <center>
                                <Dropdown.Item className='m-3' text={userAssociation} />
                            </center>


                            <Dropdown.Divider />
                            <Dropdown.Item icon='user circle' text='My Profile' onClick={() => {
                                navigate("/profile")
                            }
                            } />
                            <Dropdown.Item onClick={() => { navigate('/estimations') }} icon='calculator' text='My Estimations' />

                            <Dropdown.Divider />
                            <Dropdown.Item onClick={logout} icon='log out' color='red' text='Logout' />
                        </Dropdown.Menu>
                    </Dropdown>


                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavScrollExample;