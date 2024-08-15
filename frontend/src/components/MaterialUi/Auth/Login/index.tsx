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

    const onSubmit = <T extends React.MouseEvent<HTMLButtonElement, MouseEvent> | React.FormEvent<HTMLButtonElement>>(
        e: T,
        data: ILogin
    ) => {
        e.preventDefault();
        onLogin(data);
    };
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
                            type="password"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="text"
                            onClick={e => onSubmit(e, { email: login, password })}
                            onSubmit={e => onSubmit(e, { email: login, password })}
                            type="submit"
                        >
                            Login
                        </Button>
                    </Grid>
                </GridContainerStyled>
            </Box>
        </WrapperStyled>
    );
};

export default Login;
