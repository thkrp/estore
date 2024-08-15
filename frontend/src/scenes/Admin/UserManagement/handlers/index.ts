import { UpdatePublicUser, UserList } from 'app-shared';
import { UserManagementState } from '../types/user.management.state';
import { removeUndefinedProps } from '../../../../common/helpers/object.helper';

export const updateUserListHandler = (state: UserManagementState, payload: UserList) => ({
    ...state,
    ...payload
});

export const deleteUsersHandler = (state: UserManagementState, userIds: string[]) => ({
    ...state,
    users: state.users.filter(user => !userIds.includes(user.id)),
    totalCount: state.totalCount - userIds.length
});

export const updateUsersHandler = (state: UserManagementState, users: UpdatePublicUser[]) => {
    const updatedUsers = users.reduce(
        (acc, user) => {
            const { id, ...props } = user;
            return {
                ...acc,
                [id]: removeUndefinedProps(props)
            };
        },
        {} as { [key: string]: Omit<UpdatePublicUser, 'id'> }
    );

    return {
        ...state,
        users: state.users.map(user => {
            if (updatedUsers[user.id]) {
                return {
                    ...user,
                    ...updatedUsers[user.id]
                };
            }
            return user;
        })
    };
};
