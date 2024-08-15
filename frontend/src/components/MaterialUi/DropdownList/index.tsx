import React, { useRef, useState } from 'react';
import { Box, ClickAwayListener, MenuItem, MenuList, Paper, PopperPlacementType } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { grey } from '@mui/material/colors';
import { ButtonStyled, GrowStyled, PopperStyled } from './index.styles';
import { Entries } from '../../../common/types/object.entries.generic';

type Option<T> = { key: keyof T; value: T[keyof T] };

type Props<T> = {
    isDisabled: boolean;
    options: T;
    selected: keyof T;
    onSelect: (option: Option<T>) => void;
    placement?: PopperPlacementType;
};

const DropdownList = <T extends Record<string, string>>({
    isDisabled,
    options,
    selected,
    onSelect,
    placement = 'top'
}: Props<T>) => {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLDivElement>(null);
    const handleToggle = () => {
        setOpen(prev => !prev);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMenuItemClick = (option: Option<T>) => {
        onSelect(option);
        setOpen(false);
    };

    if (!options[selected]) {
        return null;
    }

    return (
        <>
            <Box ref={anchorRef}>
                <ButtonStyled onClick={handleToggle} disabled={isDisabled}>
                    {options[selected]}
                    <ArrowDropDownIcon sx={{ color: grey[400] }} />
                </ButtonStyled>
            </Box>
            <PopperStyled
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement={placement}
            >
                {({ TransitionProps, placement: popperPlacement }) => (
                    <GrowStyled {...TransitionProps} placement={popperPlacement}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList>
                                    {(Object.entries(options) as Entries<T>).map(([key, value]) => (
                                        <MenuItem
                                            key={key as string}
                                            selected={key === options[selected]}
                                            onClick={() => handleMenuItemClick({ key, value })}
                                        >
                                            {value}
                                        </MenuItem>
                                    ))}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </GrowStyled>
                )}
            </PopperStyled>
        </>
    );
};

export default DropdownList;
