import * as React from 'react';
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';

import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Button, Label } from 'semantic-ui-react';
import SingleNotification from '../cards/SingleNotification';
import { base_url } from '../..';
import { useApiRequest } from '../api/useApiRequest';
import { useNavigate } from 'react-router-dom';
import not_found from '../../assets/not_found.json'
import { LoadAnimation } from '../utils/LoadAnimation'
import axios from 'axios';
import {socket} from '../../socket';

import '../cards/card.css'
import { List } from '@mui/material';
import Cookies from 'universal-cookie';
import { showToast } from '../../App';

export const NotificationDropdown = () => {

    const navigate = useNavigate()
    const cookies = new Cookies();

    const [newNotificationCount, setNewNotificationCount] = React.useState(0);


    const [notificationsState, setNotificationsState] = React.useState([])
    const [hasNewNotifications, setHasNewNotifications] = React.useState(false)

    const { data: notifications, dataLoading, error } = useApiRequest({
        url: base_url + 'notification/?page=1',
        method: 'GET'
    })

    React.useEffect(() => {
        console.log('notifications', notifications)
        setNotificationsState(notifications)
    }, [notifications])

    React.useEffect(() => {
        socket.on('notification', (notification) => {
            setHasNewNotifications(true)
            setNotificationsState((prevState) => {
                return {
                    ...prevState,
                    notifications: [notification, ...prevState.notifications]
                }
            })
        })
    }, [])

    // try {
    //     useInterval(async () => {
    //         // console.log('notification polling')
    //         // use axios directly
    //         const polledNotifications = await axios.get(base_url + 'notification/?page=1',
    //             {
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                     Authorization: `Bearer ${cookies.get("token")}`
    //                 }
    //             }
    //         )
    //         // console.log('polledNotifications', polledNotifications)
    //         // extract the ids of the current notifications
    //         const currentIds = notificationsState?.notifications?.map((notification) => {
    //             return notification.id
    //         })

    //         // extract the ids of the new notifications
    //         const newIds = polledNotifications.data.notifications.map((notification) => {
    //             return notification.id
    //         })

    //         // if newIds contains an id that is not in currentIds
    //         // then there is a new notification
    //         // set the state accordingly
    //         if (newIds?.some((id) => !currentIds?.includes(id))) {
    //             setHasNewNotifications(true)
    //         }

    //         // let unread = 0
    //         // // extract the ids of notifications
    //         // notifications?.notifications?.forEach((notification) => {
    //         //     if (!notification.read) {
    //         //         unread += 1
    //         //     }
    //         // }
    //         // )
    //         // setNewNotificationCount(unread)

    //         // if (unread > 0) {
    //         //     setHasNewNotifications(true)
    //         //     console.log('has new notifications', newNotificationCount)
    //         // } else {
    //         //     // setHasNewNotifications(false)
    //         // }

    //         // only add to state if notificationsState does not contain
    //         // the id of the new notification
    //         // const toBeAddedNotifications = polledNotifications.data.notifications.filter((notification) => {
    //         //     return !notificationsState?.notifications?.some((existingNotification) => {
    //         //         return existingNotification.id === notification.id
    //         //     })
    //         // })
    //         // setNotificationsState((prevState) => {
    //         //     return {
    //         //         ...prevState,
    //         //         notifications: [...toBeAddedNotifications, ...prevState.notifications]
    //         //     }
    //         // })
    //         setNotificationsState(polledNotifications.data)
    //     }, 5000)
    // } catch (err) {
    //     console.log('could not fetch notifications')
    // }

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
                        icon='bell outline'
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Button onClick={() => { setHasNewNotifications(false) }} icon='bell outline' />
                        {hasNewNotifications && <Label color='red' floating pointing={'below'} />}
                        {/* <Label color='red' floating>
                            {newNotificationCount}
                        </Label> */}

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
                        maxWidth: '500px',
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
               

                <div style={{ textAlign: 'right'}} className='me-2'>


                    <Button onClick={() => { navigate('/notifications') }} className='mb-2' basic primary>See all</Button>
                </div>
               
                <Divider />

                {notificationsState?.notifications?.length === 0 ?

                    <LoadAnimation animData={not_found} />

                    :

                    <List style={{ maxHeight: '500px', overflowY: 'auto' }}>
                        {notificationsState?.notifications?.map((notification) => {
                            return (
                                <div className=' me-3 ms-4' onClick={() => { navigate(notification.link) }} style={{ cursor: 'pointer' }}>

                                    <SingleNotification singleNotification={notification} />
                                    <Divider />

                                </div>
                            )
                        })
                        }

                    </List>
                }

            </Menu>
        </React.Fragment>
    );
}