import React, { FC, useState } from 'react';
import { TopMenu } from 'app-shared';
import { FormattedMessage } from 'react-intl';
import {
    ElementStyled,
    ListStyled,
    LinkStyled,
    WrapperStyled,
    AboutButtonStyled,
    ElementsStyled
} from './index.styles';
import Container from '../../Container';
import Language from '../../Language';

type Props = {
    menu?: TopMenu;
};

const TopNav: FC<Props> = ({ menu }) => {
    const [showNav, setShowNav] = useState(false);

    if (!menu) {
        return null;
    }

    return (
        <Container>
            <WrapperStyled>
                <ListStyled>
                    <AboutButtonStyled onClick={() => setShowNav(prev => !prev)}>
                        <FormattedMessage id="about" />
                    </AboutButtonStyled>
                    <ElementsStyled $showNav={showNav}>
                        {Object.entries(menu).map(([, page]) => (
                            <ElementStyled key={page.code}>
                                <LinkStyled to={`/${page.code}`}>{page.name}</LinkStyled>
                            </ElementStyled>
                        ))}
                    </ElementsStyled>
                </ListStyled>
                <Language />
            </WrapperStyled>
        </Container>
    );
};

export default TopNav;
