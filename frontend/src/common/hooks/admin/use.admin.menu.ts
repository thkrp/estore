import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import PeopleIcon from '@mui/icons-material/People';
import { useEffect, useState } from 'react';
import { Location } from 'react-router-dom';
import { AdminRoutes, Routes } from '../../enums/routing/routes';

const adminMenuInit = [
    {
        code: 'dashboard',
        name: 'dashboard',
        path: Routes.adminBaseUrl,
        Icon: DashboardCustomizeIcon,
        isActive: true
    },
    {
        code: 'users',
        name: 'user management',
        path: AdminRoutes.userManagement,
        Icon: PeopleIcon,
        isActive: false
    }
];
export const useAdminMenu = (location: Location) => {
    const [adminMenu, setAdminMenu] = useState(adminMenuInit);
    useEffect(() => {
        const [, adminUrl, sectionUrl] = location.pathname.split('/');
        const currentLocation = `/${adminUrl}${sectionUrl ? `/${sectionUrl}` : ''}`;

        setAdminMenu(prev =>
            prev.map(item => {
                return {
                    ...item,
                    isActive: item.path === currentLocation
                };
            })
        );
    }, [location]);

    return adminMenu;
};
