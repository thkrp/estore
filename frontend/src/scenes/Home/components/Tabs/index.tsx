import React, { FC, useState } from 'react';
import { ContentStyled, ShowMoreStyled, TabItemStyled, TabListStyled, WrapperStyled } from './index.styles';
import { ProductCard } from '../../../../components';
import { transformToKey } from '../../../../common/helpers/key.helper';
import { StateElements } from '../../../../common/enums/state.elements';
import { TabContent } from '../../types/tab.content';

type Tab = {
    title: string;
    code: StateElements;
};

type Props = {
    tabs: Tab[];
    tabContent: TabContent;
    onLoadMore: (code: StateElements) => void;
};
const Tabs: FC<Props> = ({ tabs, tabContent, onLoadMore = () => {} }) => {
    const [currentTab, setCurrentTab] = useState(0);
    const items = tabContent[tabs[currentTab].code]?.items || [];
    const pageSize = tabContent[tabs[currentTab].code]?.pageSize || NaN;
    const totalCount = tabContent[tabs[currentTab].code]?.total_count || NaN;
    const currentPage = tabContent[tabs[currentTab].code]?.page || NaN;
    const showButton = currentPage < Math.ceil(totalCount / pageSize);

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
                    {items.map((product, i) => (
                        <ProductCard key={transformToKey(i, `${currentTab}_${product.code}`)} item={product} />
                    ))}
                </ContentStyled>
                {showButton && (
                    <ShowMoreStyled
                        role="presentation"
                        onClick={() => onLoadMore(tabs[currentTab].code)}
                        $isLoading={tabContent[tabs[currentTab].code]?.isLoading || false}
                    >
                        more
                    </ShowMoreStyled>
                )}
            </div>
        </WrapperStyled>
    );
};

export default Tabs;
