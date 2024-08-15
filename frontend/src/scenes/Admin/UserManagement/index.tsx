import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FilterOptions, PublicUser, UpdatePublicUser } from 'app-shared';
import { useNavigate } from 'react-router-dom';
import { debounce, TablePagination } from '@mui/material';
import { deleteUsersRoutine, getUsersRoutine, updateUsersRoutine } from './routines';
import { RootState } from '../../../store/types/root.state';
import { UserList, ActionBar } from './components';
import { AdminRoutes } from '../../../common/enums/routing/routes';
import { TextFieldStyled, WrapperStyled } from './index.styles';

type Props = {
    users: PublicUser[];
    getUsers: (filterParams?: FilterOptions) => void;
    totalCount: number;
    deleteUsers: (userIds: string[]) => void;
    updateUsers: (users: UpdatePublicUser[]) => void;
};

const rowsPerPageOptions: number[] = [10, 25, 100];

const UserManagement = ({ getUsers, users, totalCount, deleteUsers, updateUsers }: Props) => {
    const navigate = useNavigate();
    const [checked, setChecked] = React.useState<string[]>([]);
    const [search, setSearch] = useState('');
    const [filterOptions, setFilterOptions] = React.useState<FilterOptions>({});
    const [pageSize, setPageSize] = React.useState(10);
    const [page, setPage] = React.useState(0);

    useEffect(() => {
        setFilterOptions(prevOptions => ({
            ...prevOptions,
            paginationOptions: {
                ...prevOptions.paginationOptions,
                page: page + 1,
                pageSize
            }
        }));
    }, [page, pageSize]);

    const UpdateFilterSearch = debounce(setFilterOptions, 300);

    useEffect(() => {
        UpdateFilterSearch(prevOptions => {
            return {
                ...prevOptions,
                search
            };
        });
    }, [search]);

    const toggleCheckbox = (userId: string) => {
        setChecked(prev => {
            let newState = [];
            if (prev.includes(userId)) {
                newState = prev.filter(id => id !== userId);
            } else {
                newState = [...prev, userId];
            }
            return newState;
        });
    };

    const selectAll = () => {
        setChecked(prev => (prev.length === users.length ? [] : users.map(user => user.id)));
    };

    const onNavigate = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        navigate(`${AdminRoutes.userManagement}/${id}`);
    };

    const onDeleteUsers = () => {
        deleteUsers(checked);
        setChecked([]);
    };

    const onUpdateUsers = (updatedUsers: UpdatePublicUser[]) => {
        updateUsers(updatedUsers);
        setChecked([]);
    };

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPage(0);
    };

    return (
        <WrapperStyled>
            <TextFieldStyled
                id="outlined-basic"
                label="Search"
                variant="outlined"
                onChange={e => {
                    UpdateFilterSearch.clear();
                    setSearch(e.target.value);
                }}
                value={search}
                size="small"
            />
            <UserList
                getUsers={getUsers}
                users={users}
                onSelectAll={selectAll}
                checked={checked}
                onToggleCheckbox={toggleCheckbox}
                onNavigate={onNavigate}
                filterOptions={filterOptions}
            />
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={totalCount}
                rowsPerPage={pageSize}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <ActionBar
                isDisabled={!checked.length}
                onDelete={onDeleteUsers}
                selectedIds={checked}
                onUpdate={onUpdateUsers}
            />
        </WrapperStyled>
    );
};

const mapStateToProps = (rootState: RootState) => ({
    isLoading: rootState.admin.userManagement.isLoading,
    users: rootState.admin.userManagement.users,
    totalCount: rootState.admin.userManagement.totalCount
});

const mapDispatchToProps = {
    getUsers: getUsersRoutine,
    deleteUsers: deleteUsersRoutine,
    updateUsers: updateUsersRoutine
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
