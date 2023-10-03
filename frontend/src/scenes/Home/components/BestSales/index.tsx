import React, { FC, useEffect, useState } from 'react';
import { Product } from 'app-shared';
import { FormattedMessage } from 'react-intl';
import { Container, ProductCard } from '../../../../components';
import {
    ContentStyled,
    HeadingStyled,
    ListStyled,
    MainItemStyled,
    ProductCardStyled,
    WrapperStyled
} from './index.styles';
import { transformToKey } from '../../../../common/helpers/key.helper';

type Props = {
    products?: Product[];
    isLoading: boolean;
};

const messageId = 'bestSales';

const BestSales: FC<Props> = ({ products, isLoading }) => {
    const [mainItem, setMainItem] = useState<Product | null>(null);

    useEffect(() => {
        if (products) {
            const [bestSellingItem] = products;
            setMainItem(bestSellingItem);
        }
    }, [products]);

    return (
        <WrapperStyled>
            <Container>
                <HeadingStyled>
                    <FormattedMessage id={messageId} />
                </HeadingStyled>
                {!isLoading ? (
                    <ContentStyled>
                        <ListStyled>
                            {products
                                ?.filter(item => item.id !== mainItem?.id)
                                .map((item, i) => (
                                    <ProductCardStyled
                                        key={transformToKey(i, `${messageId}_${item.code}`)}
                                        item={item}
                                        className="bs-item"
                                    />
                                ))}
                        </ListStyled>
                        <MainItemStyled>{!!mainItem && <ProductCard item={mainItem} />}</MainItemStyled>
                    </ContentStyled>
                ) : (
                    <div>Loading...</div>
                )}
            </Container>
        </WrapperStyled>
    );
};

export default BestSales;
