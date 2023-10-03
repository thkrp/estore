import styled from 'styled-components';
import { maxWidth, media } from '../../styles/media';

export const WrapperStyled = styled.div`
    width: 100%;
    max-width: ${maxWidth};
    margin: 0 auto;
    ${media.desktopMd`
      padding: 0 10px;
    `};
`;
