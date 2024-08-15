import React from 'react';
import styled from 'styled-components';
import { Button, Grow, GrowProps, Popper, PopperPlacementType } from '@mui/material';

export const ButtonStyled = styled(Button)`
    color: ${({ theme }) => theme.palette.text.primary};
    &:hover {
        background-color: ${({ theme }) => theme.palette.grey[300]};
    }
`;

export const PopperStyled = styled(Popper)`
    z-index: 1;
`;

export const GrowStyled = styled(
    ({ placement, children, ...props }: { placement: PopperPlacementType } & GrowProps) => (
        <Grow {...props}>{children}</Grow>
    )
)`
    transform-origin: ${({ placement }) => (placement === 'bottom' ? 'center top' : 'center bottom')};
`;
