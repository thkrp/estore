import React, { useEffect } from 'react';
import { Container } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { Login as ILogin } from 'app-shared';
import { Login } from '../../components';
import useUser from '../../common/hooks/use.user';
import { LoginRoutine } from './routines';
import { Routes } from '../../common/enums/routing/routes';

type Props = {
    login: (data: ILogin) => void;
};
const Authorization = ({ login }: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useUser();
    useEffect(() => {
        if (user) {
            navigate(location?.state?.previous || Routes.baseUrl);
        }
    }, [user]);
    return (
        <Container>
            <Login onLogin={data => login(data)} />
        </Container>
    );
};

const mapDispatchToProps = {
    login: LoginRoutine
};

export default connect(null, mapDispatchToProps)(Authorization);
