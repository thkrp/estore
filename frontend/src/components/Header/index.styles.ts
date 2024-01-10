import styled from 'styled-components';
import { media } from '../../styles/media';

export const HeaderStyled = styled.div`
    display: flex;
    align-items: center;
    margin: 0;
    justify-content: space-between;
    padding: 10px 0;
    & > div {
        margin: 0 7px;
    }
    ${media.tablet`
        flex-wrap: wrap;
        & > div {
            margin: 10px 7px;
        }
    `}
`;
