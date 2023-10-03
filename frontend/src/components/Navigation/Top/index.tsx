import React, { FC } from 'react';
import { TopMenu } from 'app-shared';
import { ElementStyled, ListStyled, LinkStyled, WrapperStyled } from './index.styles';
import Container from '../../Container';
import Language from '../../Language';

type Props = {
    menu?: TopMenu;
};

const TopNav: FC<Props> = ({ menu }) => {
    if (!menu) {
        return null;
    }

    return (
        <Container>
            <WrapperStyled>
                <ListStyled>
                    {Object.entries(menu).map(([, page]) => (
                        <ElementStyled key={page.code}>
                            <LinkStyled to={`/${page.code}`}>{page.name}</LinkStyled>
                        </ElementStyled>
                    ))}
                </ListStyled>
                <Language />
            </WrapperStyled>
        </Container>
    );
};

export default TopNav;
