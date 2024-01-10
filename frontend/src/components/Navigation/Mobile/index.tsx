import React, { FC, useState } from 'react';
import { GeneralInfo } from 'app-shared';
import { ReactComponent as HomeIcon } from '../../../assets/icons/home.svg';
import { ReactComponent as ListIcon } from '../../../assets/icons/list.svg';
import { ReactComponent as CartIcon } from '../../../assets/icons/cart.svg';
import { ReactComponent as MoreIcon } from '../../../assets/icons/more.svg';
import {
    LinkStyled,
    LogoWrapperStyled,
    MobileStyled,
    MoreLinkStyled,
    MoreStyled,
    MoreTopStyled,
    WrapperStyled,
    IconStyled
} from './index.styles';
import Logo from '../../Logo';
import { Menu } from '../../../store/app/types/app.state';
import Language from '../../Language';
import Link from '../../Links/Link';
import { Routes } from '../../../common/enums/routing/routes';

type Props = {
    info?: GeneralInfo;
    menu: Partial<Menu>;
};

const MobileNav: FC<Props> = ({ info, menu }) => {
    const [showMore, setShowMore] = useState(false);

    return (
        <WrapperStyled>
            <MobileStyled>
                <LinkStyled to={Routes.baseUrl} role="menuitem">
                    <IconStyled>
                        <HomeIcon />
                    </IconStyled>
                </LinkStyled>
                <LinkStyled to={Routes.catalog} role="menuitem">
                    <IconStyled>
                        <ListIcon />
                    </IconStyled>
                </LinkStyled>
                <LinkStyled to={Routes.cart} role="menuitem">
                    <IconStyled>
                        <CartIcon />
                    </IconStyled>
                </LinkStyled>
                <MoreStyled type="button" onClick={() => setShowMore(prev => !prev)}>
                    <IconStyled>
                        <MoreIcon />
                    </IconStyled>
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
