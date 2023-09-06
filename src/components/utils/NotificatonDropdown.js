import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Button, Comment, Grid, Icon } from 'semantic-ui-react';
import SingleNotification from '../cards/SingleNotification';
import { base_url } from '../..';
import { useApiRequest } from '../api/useApiRequest';
import { useNavigate } from 'react-router-dom';

import '../cards/card.css'
import { List } from '@mui/material';

export const NotificationDropdown = () => {

    const navigate = useNavigate()


    const { data: notifications, dataLoading, error } = useApiRequest({
        url: base_url + 'notification/?page=1',
        method: 'GET'
    })

    React.useEffect(() => {
        console.log('notifications', notifications)
    }, [notifications])


    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>

                <Tooltip title="Notifications">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Button icon='bell outline' />
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        maxWidth: '400px',
                        overflow: 'hidden',

                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',

                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                <div style={{ textAlign: 'right' }} className='me-2'>


                    <Button onClick={() => { navigate('/notifications') }} className='mb-2' basic primary>See all</Button>
                </div>
                <Divider />

                <List style={{ maxHeight: '500px', overflowY: 'auto' }}>
                    {notifications?.notifications.map((notification) => {
                        return (
                            <div className='ms-3 me-4 mt-3'>

                                <Comment.Group >
                                    <SingleNotification singleNotification={notification} />
                                    <Divider />
                                </Comment.Group>
                            </div>
                        )
                    })
                    }

                </List>

            </Menu>
        </React.Fragment>
    );
}