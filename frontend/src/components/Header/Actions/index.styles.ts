import styled, { css } from 'styled-components';
import { theme } from '../../../styles/theme';
import ContactLink from '../../Links/ContactLink';
import { media } from '../../../styles/media';

export const WrapperStyled = styled.div`
    min-height: 50px;
    flex: 1 1 50%;
    ${media.tablet`
        flex: 1 1 100%;
        order: 3;
    `}
`;

export const ContactListStyled = styled.div`
    display: flex;
    flex-wrap: wrap;
`;

const ContactsLinkCss = css`
    color: ${theme.colors.darkgrey};
    fill: ${theme.colors.darkgrey};
    &:hover {
        color: ${theme.colors.main.primary};
        fill: ${theme.colors.main.primary};
    }
`;

export const PhoneLinkStyled = styled(ContactLink)`
    ${ContactsLinkCss};
`;

export const EmailLinkStyled = styled(ContactLink)`
    ${ContactsLinkCss};
`;
