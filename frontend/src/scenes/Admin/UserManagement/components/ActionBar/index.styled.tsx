import React from 'react';
import styled from 'styled-components';
import { Button, Grid } from '@mui/material';
import { GridProps } from '@mui/material/Grid/Grid';

export const GridContainerStyled = styled((props: GridProps) => <Grid container {...props} />)`
    flex-wrap: nowrap;
    gap: ${({ theme }) => theme.spacing(3)};
`;

export const ButtonStyled = styled(Button)`
    color: ${({ theme }) => theme.palette.text.primary};
    &:hover {
        background-color: ${({ theme }) => theme.palette.grey[300]};
    }
`;

export const ApplyButtonStyled = styled(Button)`
    color: ${({ theme }) => theme.palette.common.white};
    background-color: ${({ theme }) => theme.palette.blue[400]};
    &:hover {
        background-color: ${({ theme }) => theme.palette.blue[600]}
`;

export const IconWrapper = styled.span`
    margin-right: 2px;
    display: flex;
    align-items: center;
    svg {
        font-size: 20px;
    }
`;
