import React, { FC, ReactElement } from 'react';
import { BottomMenu, BottomMenuItemDto } from 'app-shared';
import {
    FooterStyled,
    ListHeadingStyled,
    ListStyled,
    ListItemStyled,
    ListWrapperStyled,
    LogoDescriptionStyled,
    LogoWrapperStyled,
    MenuWrapperStyled,
    WrapperStyled
} from './index.styles';
import Container from '../Container';
import { FooterInfo } from '../../common/types/footer.info';
import Logo from '../Logo';
import Link from '../Links/Link';
import ContactLink from '../Links/ContactLink';
import ExternalLink from '../Links/ExternalLink';

type Props = {
    info?: FooterInfo;
    menu?: BottomMenu[];
};

enum LinkTypes {
    section = 'SECTION',
    link = 'LINK',
    email = 'EMAIL',
    phone = 'PHONE',
    external = 'EXTERNAL'
}

const Links: { [key in LinkTypes]: (item: BottomMenuItemDto) => ReactElement } = {
    [LinkTypes.section]: ({ url, name }) => <Link to={url}>{name}</Link>,
    [LinkTypes.link]: ({ url, name }) => <Link to={url}>{name}</Link>,
    [LinkTypes.phone]: ({ name }) => <ContactLink value={name} type="phone" hiddenIcon />,
    [LinkTypes.email]: ({ name }) => <ContactLink value={name} type="email" hiddenIcon />,
    [LinkTypes.external]: ({ url, name }) => <ExternalLink href={url} title={name} />
};

const Footer: FC<Props> = ({ menu, info }) => {
    return (
        <WrapperStyled>
            <Container>
                <FooterStyled>
                    <LogoWrapperStyled>
                        <Logo logo={info?.logo_footer} />
                        <LogoDescriptionStyled>{info?.footer_description}</LogoDescriptionStyled>
                    </LogoWrapperStyled>
                    <MenuWrapperStyled>
                        {!!menu?.length &&
                            menu.map(list => (
                                <ListWrapperStyled key={list.name}>
                                    <ListHeadingStyled>{list.name}</ListHeadingStyled>
                                    <ListStyled>
                                        {list.items.map(li => {
                                            const LinkComponent = Links[li.type as LinkTypes];
                                            return <ListItemStyled key={li.name}>{LinkComponent(li)}</ListItemStyled>;
                                        })}
                                    </ListStyled>
                                </ListWrapperStyled>
                            ))}
                    </MenuWrapperStyled>
                </FooterStyled>
            </Container>
        </WrapperStyled>
    );
};

export default Footer;
