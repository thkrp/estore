import React from 'react';
import styled, { css } from 'styled-components';
import {
    AppBar,
    AppBarProps,
    Button,
    ButtonProps,
    Drawer,
    DrawerProps,
    IconButton,
    IconButtonProps,
    Toolbar
} from '@mui/material';

const drawerWidth = '240px';
export const AppBarStyled = styled(({ open, ...props }: { open: boolean } & AppBarProps) => <AppBar {...props} />)`
    background-color: ${({ theme }) => theme.palette.grey[800]};
    ${({ open }) =>
        open
            ? css`
                  margin-left: ${drawerWidth};
                  width: calc(100% - ${drawerWidth});
                  transition: ${({ theme }) =>
                      theme.transitions.create(['width', 'margin', 'z-index'], {
                          easing: theme.transitions.easing.sharp,
                          duration: theme.transitions.duration.enteringScreen
                      })};
              `
            : css`
                  z-index: ${({ theme }) => theme.zIndex.drawer + 1};
                  transition: ${({ theme }) =>
                      theme.transitions.create(['width', 'margin', 'z-index'], {
                          easing: theme.transitions.easing.sharp,
                          duration: theme.transitions.duration.leavingScreen
                      })};
              `};
`;

export const DrawerStyled = styled(({ open, ...props }: DrawerProps) => <Drawer {...props} />)`
    & .MuiDrawer-paper {
        position: relative;
        white-space: nowrap;
        width: ${drawerWidth};
        transition: ${({ theme }) =>
            theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })};
        box-sizing: border-box;
        ${({ open, theme }) =>
            !open &&
            css`
                overflow-x: hidden;
                transition: ${theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen
                })};
                width: ${theme.spacing(7)};
            `}
    }
`;
export const LinkClientStyled = styled((props: ButtonProps) => <Button {...props} />)`
    color: ${({ theme }) => theme.palette.common.white};
`;

export const AppBarButtonsStyled = styled.div`
    margin-left: auto;
`;

export const ToolbarStyled = styled(Toolbar)`
    padding-right: 24px; // keep right padding when drawer closed
`;

export const MenuIconWrapper = styled(({ open, ...props }: { open: boolean } & IconButtonProps) => (
    <IconButton {...props} />
))`
    margin-right: 36px;
    ${({ open }) =>
        open &&
        css`
            display: none;
        `};
`;

export const DrawerToolbarStyled = styled(Toolbar)`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: ${({ theme }) => theme.spacing(1)};
    padding-left: ${({ theme }) => theme.spacing(1)};
`;
