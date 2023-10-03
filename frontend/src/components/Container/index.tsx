import React, { FC, ReactNode } from 'react';
import { WrapperStyled } from './index.styles';

type Props = {
    children: ReactNode;
    className?: string;
};
/**
 * A wrapper for content that limits the width.
 */
const Container: FC<Props> = ({ children, className }) => (
    <WrapperStyled className={className}>{children}</WrapperStyled>
);

export default Container;
