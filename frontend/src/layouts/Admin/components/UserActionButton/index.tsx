import React from 'react';
import { Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import { PublicUser } from 'app-shared';
import { AccountCircle } from '@mui/icons-material';
import useUser from '../../../../common/hooks/use.user';

const UserActionButton = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const { user, onLogout } = useUser();

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
            >
                {(user as PublicUser & { photo: string }).photo ? (
                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                ) : (
                    <AccountCircle />
                )}
            </IconButton>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserActionButton;
