import styled from 'styled-components';
import Link from '../Links/Link';

export const WrapperStyled = styled.div`
    flex: 0 0 30%;
    min-width: 250px;
`;

export const LogoStyled = styled(Link)`
    display: block;
    width: 100%;
    height: 100%;
    img {
        width: 100%;
    }
`;
