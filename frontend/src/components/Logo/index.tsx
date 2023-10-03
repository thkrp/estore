import React, { FC } from 'react';
import { LogoStyled, WrapperStyled } from './index.styles';
import { imageUrl } from '../../common/helpers/path.helper';

type Props = {
    logo?: string;
};
const Logo: FC<Props> = ({ logo }) => {
    return (
        <WrapperStyled>
            <LogoStyled to="/">
                <img src={imageUrl(logo)} alt="logo" />
            </LogoStyled>
        </WrapperStyled>
    );
};

export default Logo;
