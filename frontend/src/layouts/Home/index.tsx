import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { GeneralInfo } from 'app-shared';
import { Menu } from '../../store/app/types/app.state';
import {
    WrapperStyled,
    ContentWrapperStyled,
    LeftSideStyled,
    MobileWrapperStyled,
    SearchWrapperStyled
} from '../index.styles';
import { ContentStyled, RightSideStyled } from './index.styles';
import {
    Header,
    Footer,
    Container,
    CatalogNav,
    HomeSlider,
    SpecialCategories,
    MobileNav,
    Search
} from '../../components';
import useDeviceDetect from '../../common/hooks/use.device.detect';

type Props = {
    info?: GeneralInfo;
    menu: Partial<Menu>;
};

const Mobile: FC<Props> = ({ info, menu }) => {
    return (
        <MobileWrapperStyled>
            <HomeSlider />
            <SearchWrapperStyled>
                <Search />
            </SearchWrapperStyled>
            <SpecialCategories />
            <Outlet />
            <MobileNav info={info} menu={menu} />
        </MobileWrapperStyled>
    );
};

const HomeLayout: FC<Props> = ({ info, menu }) => {
    const isMobile = useDeviceDetect();
    if (isMobile) {
        return <Mobile menu={menu} info={info} />;
    }

    return (
        <WrapperStyled>
            <Header menu={menu.top} info={info} />
            <ContentWrapperStyled>
                <Container>
                    <ContentStyled>
                        <LeftSideStyled>
                            <CatalogNav menu={menu.catalog} />
                        </LeftSideStyled>
                        <RightSideStyled>
                            <HomeSlider />
                        </RightSideStyled>
                    </ContentStyled>
                    <SpecialCategories />
                </Container>
                <Outlet />
            </ContentWrapperStyled>
            <Footer
                menu={menu.bottom}
                info={{ logo_footer: info?.logo_footer, footer_description: info?.footer_description }}
            />
        </WrapperStyled>
    );
};

export default HomeLayout;
