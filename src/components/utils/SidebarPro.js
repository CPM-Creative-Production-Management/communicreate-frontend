import React from "react";
import {Sidebar, Menu, MenuItem, SubMenu} from 'react-pro-sidebar';
import {Link} from 'react-router-dom';
import {RxDashboard} from "react-icons/rx";
import {BsArchive, BsPersonAdd, BsPersonWorkspace} from "react-icons/bs";

import {LuCalculator} from "react-icons/lu";
import {AiOutlineInfoCircle} from "react-icons/ai";
import {HiOutlineMail} from "react-icons/hi";
import {Divider} from "semantic-ui-react";
import {RiTeamLine} from "react-icons/ri";
import {SiAntdesign} from "react-icons/si";
import Navbar from "react-bootstrap/Navbar";
import {BiGitPullRequest} from "react-icons/bi";


export const SidebarPro = () => {

    const [collapsed, setCollapsed] = React.useState(false);

    return (
        <div style={{display: 'flex', position:"fixed", bottom:'0px', height: '100vh'}}>
            <Sidebar collapsed={collapsed}>
                <Menu
                    menuItemStyles={{
                        button: {
                            [`&.active`]: {
                                backgroundColor: '#13395e',
                                color: '#b6c8d9',
                            },
                        },
                    }}
                >

                    <MenuItem component={<Link to="/"/>} icon={<SiAntdesign/>} disabled> CPM </MenuItem>
                    <MenuItem component={<Link to="/"/>} icon={<RxDashboard/>}> Dashboard </MenuItem>

                    <MenuItem component={<Link to="/requests"/>} icon={<BiGitPullRequest/>}> My Requests </MenuItem>

                    <SubMenu label="Employees" icon={<BsPersonWorkspace/>}>
                        <MenuItem icon={<RiTeamLine/>} component={<Link to="/my-employees"/>}> All Employees </MenuItem>
                        <MenuItem icon={<BsPersonAdd/>} component={<Link to="/add-employee"/>}> Add Employee </MenuItem>
                    </SubMenu>
                    <MenuItem component={<Link to="/archive"/>} icon={<BsArchive/>}> Archive </MenuItem>
                    <MenuItem component={<Link to="/estimations"/>} icon={<LuCalculator/>}> Estimations </MenuItem>

                    <Divider/>

                    <MenuItem icon={<AiOutlineInfoCircle/>}> About Us </MenuItem>
                    <MenuItem icon={<HiOutlineMail/>}> Contact Us </MenuItem>


                </Menu>
            </Sidebar>
        </div>
    );

}