import React, { Outlet, Navigate, useLocation } from 'react-router-dom';
import useUser from '../../../common/hooks/use.user';
import { Routes } from '../../../common/enums/routing/routes';

const PrivateRoutes = () => {
    const user = useUser();
    const location = useLocation();
    return user?.id ? <Outlet /> : <Navigate to={Routes.authorization} state={{ previous: location.pathname }} />;
};

export default PrivateRoutes;
