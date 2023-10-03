import React, { FC } from 'react';
import { GeneralInfo, TopMenu } from 'app-shared';
import TopNav from '../Navigation/Top';
import { HeaderStyled } from './index.styles';
import Container from '../Container';
import Logo from '../Logo';
import Actions from './Actions';
import Cart from './Cart';

type Props = {
    menu?: TopMenu;
    info?: GeneralInfo;
};

const Header: FC<Props> = ({ menu, info }) => {
    return (
        <header>
            <TopNav menu={menu} />
            <Container>
                <HeaderStyled>
                    <Logo logo={info && info.logo} />
                    <Actions phones={info?.phones} emails={info?.emails} />
                    <Cart />
                </HeaderStyled>
            </Container>
        </header>
    );
};

export default Header;
