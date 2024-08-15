import { UserList } from 'app-shared';

export interface UserManagementState extends UserList {
    isLoading: boolean;
    pageSize: number;
}
