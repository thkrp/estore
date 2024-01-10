import React from 'react';
import styled from 'styled-components';
import { Container, Grid } from '@mui/material';
import { GridProps } from '@mui/material/Grid/Grid';

export const WrapperStyled = styled(Container)`
    max-width: 600px;
`;

export const GridContainerStyled = styled(({ ...props }: GridProps) => <Grid container {...props} />)`
    height: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
`;
