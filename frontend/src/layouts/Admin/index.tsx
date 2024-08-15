import React from 'react';
import { Outlet } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider, Toolbar } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { blue } from '@mui/material/colors';
import { MainStyled, OutletWrapper, WrapperStyled } from './index.styles';
import { AdminBar } from './components';

const defaultTheme = createTheme();

const theme = createTheme(defaultTheme, {
    palette: {
        blue: {
            ...blue
        }
    }
});

const AdminLayout = () => {
    return (
        <ThemeProvider theme={theme}>
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>
            <WrapperStyled>
                <CssBaseline />
                <AdminBar />
                <MainStyled component="main">
                    <Toolbar />
                    <OutletWrapper maxWidth="lg">
                        <Outlet />
                    </OutletWrapper>
                </MainStyled>
            </WrapperStyled>
        </ThemeProvider>
    );
};

export default AdminLayout;
