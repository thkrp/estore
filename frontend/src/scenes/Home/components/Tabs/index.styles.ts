import styled, { css } from 'styled-components';
import { theme } from '../../../../styles/theme';
import { Container } from '../../../../components';

export const WrapperStyled = styled(Container)`
    margin-top: 20px;
    margin-bottom: 50px;
`;

export const TabListStyled = styled.div`
    height: 50px;
    display: flex;
    align-items: flex-end;
`;

const activeCss = css`
    border-color: ${theme.colors.main.primary};
    background: ${theme.colors.main.primary};
    color: ${theme.colors.main.white};
    height: 100%;
    padding-top: 5px;
`;

export const TabItemStyled = styled.div<{ $active?: boolean }>`
    font-family: ${theme.fonts.bold};
    font-size: 20px;
    border-bottom: 4px solid ${theme.colors.main.background};
    background: ${theme.colors.main.background};
    flex: 1 1 25%;
    max-width: 200px;
    color: ${theme.colors.text.grey};
    cursor: pointer;
    margin: 0 2px;
    height: 90%;
    border-radius: 4px 4px 0 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: border-bottom-color ease 0.3s;

    &:hover {
        border-color: ${theme.colors.main.primary};
    }
    ${({ $active }) => ($active ? activeCss : '')}
`;

export const ContentStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

export const ShowMoreStyled = styled.div<{ $isLoading: boolean }>`
    width: 100px;
    margin: 5px auto;
    padding: 10px;
    cursor: pointer;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.1);
    pointer-events: ${({ $isLoading }) => ($isLoading ? 'none' : 'auto')};
`;
