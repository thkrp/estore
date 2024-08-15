import styled from 'styled-components';
import { Box, Container } from '@mui/material';

export const WrapperStyled = styled(Box)`
    display: flex;
    height: 100%;
`;

export const MainStyled = styled(Box)`
    background-color: ${({ theme }) => theme.palette.grey[100]};
    flex-grow: 1;
    height: 100vh;
    overflow: auto;
`;

export const OutletWrapper = styled(Container)`
    margin-top: ${({ theme }) => theme.spacing(4)};
    margin-bottom: ${({ theme }) => theme.spacing(4)};
`;
