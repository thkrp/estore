import styled from 'styled-components';
import { theme } from '../../styles/theme';
import InputText from '../InputText';

export const SearchFromStyled = styled.form`
    width: 100%;
    border: 1px solid ${theme.colors.borders.grey};
    display: flex;
    border-radius: 6px;
`;

export const SearchFromInputStyled = styled(InputText)`
    flex: 1 1 50%;
    border: none;
    outline: none;
    padding: 0 10px;
    margin: 2px 0 2px 2px;
    height: 38px;
`;

export const SearchFormButtonStyled = styled.button`
    flex: 0 0 60px;
    width: 60px;
    background: ${theme.colors.main.primary};
    fill: ${theme.colors.borders.grey};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 6px 6px 0;
    outline: none;
    border: 1px solid ${theme.colors.main.primary};

    & svg {
        width: 100%;
        max-width: 35px;
        height: 100%;
        max-height: 35px;
    }

    &:hover {
        fill: ${theme.colors.text.white};
    }
`;
