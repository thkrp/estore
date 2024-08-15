import React, { useEffect } from 'react';
import { FilterOptions, PublicUser } from 'app-shared';
import { Checkbox, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TableRowStyled, TableStyled } from './index.styles';

type props = {
    users: PublicUser[];
    onSelectAll: () => void;
    checked: string[];
    onToggleCheckbox: (id: string) => void;
    onNavigate: (e: React.MouseEvent, id: string) => void;
    getUsers: (params?: FilterOptions) => void;
    filterOptions?: FilterOptions;
};

const UserList = ({ users, onSelectAll, checked, onToggleCheckbox, onNavigate, getUsers, filterOptions }: props) => {
    useEffect(() => {
        getUsers(filterOptions);
    }, [filterOptions]);

    return (
        <TableContainer component={Paper}>
            <TableStyled aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox">
                            <Checkbox
                                id="select-all"
                                checked={users.length === checked.length}
                                onChange={onSelectAll}
                                inputProps={{
                                    'aria-label': 'select all'
                                }}
                            />
                        </TableCell>
                        <TableCell>login/email</TableCell>
                        <TableCell align="right">is active</TableCell>
                        <TableCell align="right">role</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map(user => (
                        <TableRowStyled
                            key={user.id}
                            id={`checkbox-list-label-${user.id}`}
                            onClick={() => onToggleCheckbox(user.id)}
                        >
                            <TableCell padding="checkbox">
                                <Checkbox
                                    id={user.id}
                                    checked={checked.includes(user.id)}
                                    inputProps={{ 'aria-labelledby': `checkbox-list-label-${user.id}` }}
                                />
                            </TableCell>
                            <TableCell onClick={e => onNavigate(e, user.id)}>{user.email}</TableCell>
                            <TableCell align="right">{user.isActive ? 'true' : 'false'}</TableCell>
                            <TableCell align="right">{user.role}</TableCell>
                        </TableRowStyled>
                    ))}
                </TableBody>
            </TableStyled>
        </TableContainer>
    );
};

export default UserList;
