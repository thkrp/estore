import React, { FC } from 'react';
import { Brand } from 'app-shared';
import { imageUrl } from '../../../common/helpers/path.helper';
import { CardStyled, ImageStyled } from './index.styles';

interface Props {
    item?: Brand;
    className?: string;
}

const BrandCard: FC<Props> = ({ item, className }) => {
    if (!item) {
        return null;
    }

    return (
        <CardStyled to={item.url} key={item.code} className={className} role="link">
            <ImageStyled $image={imageUrl(item.image)} />
        </CardStyled>
    );
};

export default BrandCard;
