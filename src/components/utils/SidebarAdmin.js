import React from "react";
import {Sidebar, Menu, MenuItem} from 'react-pro-sidebar';
import {Link} from 'react-router-dom';
import {RxDashboard} from "react-icons/rx";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {HiOutlineMail} from "react-icons/hi";
import {Divider} from "semantic-ui-react";
import {SiAntdesign} from "react-icons/si";
import {mobile} from "../../App";


export const SidebarAdmin = () => {

    return (
        <div style={{display: 'flex', position:"fixed", bottom:'0px', height: '100vh'}}>

            <Sidebar collapsed={mobile}>
                <Menu
                    menuItemStyles={{
                        button: {
                            // the active class will be added automatically by react router
                            // so we can use it to style the active menu item
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}

                >
                    <br/>

                    <MenuItem component={<Link to="/"/>} icon={<SiAntdesign/>} disabled> CommuniCreate </MenuItem>
                    <MenuItem component={<Link to="/"/>} icon={<RxDashboard/>}> Dashboard </MenuItem>

                    <Divider/>

                    <MenuItem icon={<AiOutlineInfoCircle/>}> About Us </MenuItem>
                    <MenuItem icon={<HiOutlineMail/>}> Contact Us </MenuItem>


                </Menu>
            </Sidebar>

        </div>
    );

}