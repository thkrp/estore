import React, { FC, useState } from 'react';
import { Product } from 'app-shared';
import { ContentStyled, TabItemStyled, TabListStyled, WrapperStyled } from './index.styles';
import { ProductCard } from '../../../../components';
import { transformToKey } from '../../../../common/helpers/key.helper';

type Tab = {
    title: string;
    code: string;
};

type Props = {
    tabs: Tab[];
    tabContent: {
        [key: string]: Product[] | undefined;
    };
};
const Tabs: FC<Props> = ({ tabs, tabContent }) => {
    const [currentTab, setCurrentTab] = useState(0);

    return (
        <WrapperStyled>
            <TabListStyled>
                {tabs.map((tab, i) => (
                    <TabItemStyled
                        role="presentation"
                        key={tab.code}
                        $active={i === currentTab}
                        onClick={() => setCurrentTab(i)}
                    >
                        {tab.title}
                    </TabItemStyled>
                ))}
            </TabListStyled>
            <div>
                <ContentStyled>
                    {tabContent[tabs[currentTab].code]?.map((product, i) => (
                        <ProductCard key={transformToKey(i, `${currentTab}_${product.code}`)} item={product} />
                    ))}
                </ContentStyled>
            </div>
        </WrapperStyled>
    );
};

export default Tabs;
