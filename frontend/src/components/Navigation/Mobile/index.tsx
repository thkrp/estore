import React, { FC, useState } from 'react';
import { GeneralInfo } from 'app-shared';
import { FormattedMessage } from 'react-intl';
import {
    LinkStyled,
    LogoWrapperStyled,
    MobileStyled,
    MoreLinkStyled,
    MoreStyled,
    MoreTopStyled,
    WrapperStyled
} from './index.styles';
import Logo from '../../Logo';
import { Menu } from '../../../store/app/types/app.state';
import Language from '../../Language';
import Link from '../../Links/Link';

type Props = {
    info?: GeneralInfo;
    menu: Partial<Menu>;
};

const MobileNav: FC<Props> = ({ info, menu }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <WrapperStyled>
            <MobileStyled>
                <LinkStyled to="/" role="menuitem">
                    <FormattedMessage id="home" />
                </LinkStyled>
                <LinkStyled to="/catalog" role="menuitem">
                    <FormattedMessage id="catalog" />
                </LinkStyled>
                <LinkStyled to="/cart" role="menuitem">
                    <FormattedMessage id="cart" />
                </LinkStyled>
                <MoreStyled type="button" onClick={() => setShowMore(prev => !prev)}>
                    <FormattedMessage id="more" />
                </MoreStyled>
            </MobileStyled>
            {showMore && (
                <MoreLinkStyled>
                    <MoreTopStyled>
                        <LogoWrapperStyled>
                            <Logo logo={info && info.logo} />
                            <Language />
                        </LogoWrapperStyled>
                        <ul>
                            {menu?.top &&
                                Object.entries(menu.top).map(([, page]) => (
                                    <li key={page.code} role="menuitem">
                                        <Link to={`/${page.code}`}>{page.name}</Link>
                                    </li>
                                ))}
                        </ul>
                    </MoreTopStyled>
                </MoreLinkStyled>
            )}
        </WrapperStyled>
    );
};

export default MobileNav;
