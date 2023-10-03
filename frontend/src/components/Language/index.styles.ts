import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const ListStyled = styled.div`
    display: flex;
    margin-left: auto;
    max-width: 150px;
`;

export const ListItemStyled = styled.div<{ $active?: boolean }>`
    display: flex;
    padding: 0 5px;
    height: 100%;
    width: 100%;
    align-items: center;
    text-decoration: none;
    font-family: ${({ $active }) => ($active ? theme.fonts.bold : theme.fonts.regular)};
    font-size: 14px;
    color: ${({ $active }) => ($active ? theme.colors.text.black : theme.colors.text.grey)};
    cursor: pointer;
`;
