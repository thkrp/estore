import React from 'react';
import cat1bg from '../../assets/images/categories/cat-1.png';
import cat2bg from '../../assets/images/categories/cat-2.png';
import { WrapperStyled, ListStyled, ElementStyled, TitleStyled, DescriptionStyled } from './index.styles';

const SpecialCategories: React.FC = () => (
    <WrapperStyled>
        <ListStyled>
            <ElementStyled to="/" backgroundImage={cat1bg}>
                <TitleStyled color="#798C9D">New Life</TitleStyled>
                <DescriptionStyled>introducing new category</DescriptionStyled>
            </ElementStyled>
            <ElementStyled to="/" backgroundImage={cat2bg} justifyContent="flex-end" textAlign="right">
                <TitleStyled color="#636363">Time & Style</TitleStyled>
                <DescriptionStyled>check out new arrivals</DescriptionStyled>
            </ElementStyled>
        </ListStyled>
    </WrapperStyled>
);

export default SpecialCategories;
