import { combineReducers } from '@reduxjs/toolkit';
import UserManagementReducer from './UserManagement/reducer';

const AdminReducer = combineReducers({
    userManagement: UserManagementReducer
});

export default AdminReducer;
