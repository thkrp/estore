import { Badge, Divider, IconButton } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Routes } from '../../../../common/enums/routing/routes';
import {
    AppBarButtonsStyled,
    AppBarStyled,
    DrawerStyled,
    DrawerToolbarStyled,
    LinkClientStyled,
    MenuIconWrapper,
    ToolbarStyled
} from './index.styles';
import AdminMenu from '../AdminMenu';
import UserActionButton from '../UserActionButton';

const AdminBar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <>
            <AppBarStyled position="absolute" open={open}>
                <ToolbarStyled>
                    <MenuIconWrapper
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        open={open}
                    >
                        <MenuIcon />
                    </MenuIconWrapper>
                    <LinkClientStyled variant="text" onClick={() => navigate(Routes.baseUrl)}>
                        site
                    </LinkClientStyled>
                    <AppBarButtonsStyled>
                        <IconButton color="inherit" size="large">
                            <Badge badgeContent={4} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <UserActionButton />
                    </AppBarButtonsStyled>
                </ToolbarStyled>
            </AppBarStyled>
            <DrawerStyled variant="permanent" open={open}>
                <DrawerToolbarStyled>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerToolbarStyled>
                <Divider />
                <AdminMenu />
            </DrawerStyled>
        </>
    );
};

export default AdminBar;
