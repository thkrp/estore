import React, { useState } from 'react';
import { Box, Button, Grid, TextField } from '@mui/material';
import { Login as ILogin } from 'app-shared';
import { GridContainerStyled, WrapperStyled } from './index.styles';

type Props = {
    onLogin: (data: ILogin) => void;
};
const Login = ({ onLogin = () => {} }: Props) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    return (
        <WrapperStyled>
            <Box component="form" noValidate autoComplete="off">
                <GridContainerStyled spacing={2}>
                    <Grid item>
                        <TextField
                            id="login"
                            label="login"
                            variant="outlined"
                            value={login}
                            onChange={e => setLogin(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            id="password"
                            label="password"
                            variant="outlined"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="text" onClick={() => onLogin({ email: login, password })}>
                            Login
                        </Button>
                    </Grid>
                </GridContainerStyled>
            </Box>
        </WrapperStyled>
    );
};

export default Login;
