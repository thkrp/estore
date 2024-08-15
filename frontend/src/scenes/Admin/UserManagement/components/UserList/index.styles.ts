import styled from 'styled-components';
import { Table, TableRow } from '@mui/material';

export const TableStyled = styled(Table)``;

export const TableRowStyled = styled(TableRow)`
    &:last-child td,
    &:last-child th {
        border: 0;
    }
`;
