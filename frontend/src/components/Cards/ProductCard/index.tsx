import React, { FC } from 'react';
import { Product } from 'app-shared';
import { imageUrl } from '../../../common/helpers/path.helper';
import { CardStyled, HeadingStyled, ImageStyled } from './index.styles';

interface Props {
    item?: Product;
    className?: string;
}

const ProductCard: FC<Props> = ({ item, className = '' }) => {
    if (!item) {
        return null;
    }

    return (
        <CardStyled to={item.url || '/'} key={item.code} className={className} role="link">
            <ImageStyled $image={imageUrl(item.image)} />
            <HeadingStyled title={item.name}>{item.name}</HeadingStyled>
        </CardStyled>
    );
};

export default ProductCard;
