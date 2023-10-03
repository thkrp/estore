import React from 'react';
import { ReactComponent as PhoneIcon } from '../../assets/icons/old-phone.svg';
import { ReactComponent as EmailIcon } from '../../assets/icons/mail.svg';
import { ReactComponent as CartIcon } from '../../assets/icons/cart.svg';
import { ReactComponent as DownArrowIcon } from '../../assets/icons/down-arrow.svg';
import { ReactComponent as FeedbackIcon } from '../../assets/icons/feedback.svg';
import { ReactComponent as HorizontalLoaderIcon } from '../../assets/icons/horizontal-loader.svg';
import { ReactComponent as ListIcon } from '../../assets/icons/list.svg';
import { ReactComponent as LoaderIcon } from '../../assets/icons/loader.svg';
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { IconsStyled, IconStyled } from './index.styles';

const icons = [
    {
        name: 'old-phone.svg',
        Component: PhoneIcon
    },
    {
        name: 'mail.svg',
        Component: EmailIcon
    },
    {
        name: 'cart.svg',
        Component: CartIcon
    },
    {
        name: 'down-arrow.svg',
        Component: DownArrowIcon
    },
    {
        name: 'feedback.svg',
        Component: FeedbackIcon
    },
    {
        name: 'horizontal-loader.svg',
        Component: HorizontalLoaderIcon,
        width: '100px'
    },
    {
        name: 'list.svg',
        Component: ListIcon
    },
    {
        name: 'loader.svg',
        Component: LoaderIcon,
        width: '50px',
        height: '50px'
    },
    {
        name: 'search.svg',
        Component: SearchIcon
    }
];

/**
 * All existing icons<br>
 * To use it, import ReactComponent from the icons<br>
 * Example: import { ReactComponent as EmailIcon } from 'assets/icons/mail.svg
 */
export const AllIcons = () => (
    <div>
        <IconsStyled>
            {icons.map(({ name, Component, width, height }) => (
                <IconStyled width={width} height={height} key={name}>
                    <Component />
                    <div>{name}</div>
                </IconStyled>
            ))}
        </IconsStyled>
    </div>
);
