import React, { FC } from 'react';
import { CatalogMenu } from 'app-shared';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as ListIcon } from '../../../assets/icons/list.svg';
import { ElementStyled, HeadingStyled, IconStyled, LinkStyled, ListStyled, WrapperStyled } from './index.styles';

type Props = {
    menu?: CatalogMenu;
};

const CatalogNav: FC<Props> = ({ menu }) => {
    if (!menu) {
        return null;
    }

    return (
        <WrapperStyled>
            <HeadingStyled>
                <IconStyled>
                    <ListIcon />
                </IconStyled>
                <LinkStyled to="/catalog">
                    <FormattedMessage id="catalog" />
                </LinkStyled>
            </HeadingStyled>
            <ListStyled>
                {Object.entries(menu).map(([, s]) => (
                    <ElementStyled key={s.code} title={s.name} to={s.url || '/'}>
                        {s.name}
                    </ElementStyled>
                ))}
            </ListStyled>
        </WrapperStyled>
    );
};

export default CatalogNav;
