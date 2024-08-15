import React from 'react';
import styled from 'styled-components';
import { Box, List, ListProps } from '@mui/material';

export const WrapperStyled = styled(Box)`
    width: 100%;
    max-width: 360px;
    background-color: ${({ theme }) => theme.palette.common.white};
`;

export const ListStyled = styled((props: ListProps) => <List {...props} />)`
    margin: 0;
    padding: 0;
    min-width: 200px;
    && .Mui-selected,
    && .Mui-selected:hover {
        background-color: ${({ theme }) => theme.palette.grey[300]};
    }
    & .MuiListItemButton-root:hover {
        background-color: ${({ theme }) => theme.palette.grey[100]};
    }
`;
