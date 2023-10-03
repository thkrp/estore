import React, { useEffect, useState } from 'react';
import { ReactComponent as LoaderIcon } from '../../assets/icons/horizontal-loader.svg';
import {
    CategoriesStyled,
    ElementStyled,
    LinkStyled,
    ListStyled,
    MoreCategoriesButtonStyled,
    WrapperStyled
} from './index.styles';
import useBreadcrumbs from '../../common/hooks/use.breadcrumbs';
import { transformToKey } from '../../common/helpers/key.helper';

const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs();
    const [showCategories, setShowCategories] = useState<Record<string, boolean>>({});

    useEffect(() => {
        setShowCategories({});
    }, [breadcrumbs]);

    return (
        <WrapperStyled>
            <ListStyled role="navigation" aria-label="breadcrumbs">
                {breadcrumbs.length
                    ? breadcrumbs.map((el, index) =>
                          index === breadcrumbs.length - 1 ? (
                              <ElementStyled key={transformToKey(index, el.code)}>
                                  {el.name || <LoaderIcon height="15px" role="img" />}
                              </ElementStyled>
                          ) : (
                              <ElementStyled key={transformToKey(index, el.code)}>
                                  <LinkStyled to={el.url}>{el.name || el.code}</LinkStyled>
                                  {el.children && (
                                      <>
                                          {breadcrumbs.length - 1 !== index && (
                                              <MoreCategoriesButtonStyled
                                                  role="presentation"
                                                  onClick={() =>
                                                      setShowCategories(prev => ({
                                                          [el.code]: !prev[el.code]
                                                      }))
                                                  }
                                              />
                                          )}
                                          {showCategories[el.code] && (
                                              <CategoriesStyled role="menu" aria-label="sub-categories">
                                                  {el.children.map((cat, i) => (
                                                      <LinkStyled
                                                          to={cat.url}
                                                          key={transformToKey(i, `${cat.url}`)}
                                                          role="menuitem"
                                                      >
                                                          {cat.name || cat.code}
                                                      </LinkStyled>
                                                  ))}
                                              </CategoriesStyled>
                                          )}
                                      </>
                                  )}
                              </ElementStyled>
                          )
                      )
                    : null}
            </ListStyled>
        </WrapperStyled>
    );
};

export default Breadcrumbs;
