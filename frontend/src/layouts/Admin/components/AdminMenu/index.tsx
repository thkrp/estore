import React from 'react';
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAdminMenu } from '../../../../common/hooks/admin/use.admin.menu';
import { ListStyled, WrapperStyled } from './index.styles';

const AdminMenu = () => {
    const location = useLocation();
    const adminMenu = useAdminMenu(location);
    const navigate = useNavigate();

    return (
        <WrapperStyled>
            <ListStyled component="nav" aria-label="main mailbox folders">
                {adminMenu.map(({ Icon, ...item }) => (
                    <ListItemButton key={item.path} selected={item.isActive} onClick={() => navigate(item.path)}>
                        <ListItemIcon>
                            <Icon />
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                ))}
            </ListStyled>
        </WrapperStyled>
    );
};

export default AdminMenu;
