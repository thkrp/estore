import React, { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { GeneralInfo } from 'app-shared';
import { Menu } from '../../store/app/types/app.state';
import { ContentWrapperStyled, LeftSideStyled, RightSideStyled, WrapperStyled } from '../index.styles';
import { CatalogNav, Container, Footer, Header, Breadcrumbs, MobileNav } from '../../components';
import { FooterInfo } from '../../common/types/footer.info';
import useDeviceDetect from '../../common/hooks/use.device.detect';

type Props = {
    info?: GeneralInfo;
    menu: Partial<Menu>;
};

const Mobile: FC<Props> = ({ info, menu }) => {
    return (
        <div>
            <Outlet />
            <MobileNav info={info} menu={menu} />
        </div>
    );
};

const MainLayout: FC<Props> = ({ info, menu }) => {
    const isMobile = useDeviceDetect();
    if (isMobile) {
        return <Mobile menu={menu} info={info} />;
    }

    const footerInfo: FooterInfo = { logo_footer: info?.logo_footer, footer_description: info?.footer_description };
    return (
        <WrapperStyled>
            <Header menu={menu.top} info={info} />
            <Container>
                <ContentWrapperStyled>
                    <LeftSideStyled>
                        <CatalogNav menu={menu.catalog} />
                    </LeftSideStyled>
                    <RightSideStyled>
                        <Breadcrumbs />
                        <Outlet />
                    </RightSideStyled>
                </ContentWrapperStyled>
            </Container>
            <Footer menu={menu.bottom} info={footerInfo} />
        </WrapperStyled>
    );
};

export default MainLayout;
