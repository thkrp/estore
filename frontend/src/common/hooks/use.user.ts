import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { RootState } from '../../store/types/root.state';
import { getAppState } from '../helpers/get.state.helper';
import { LogoutRoutine } from '../../scenes/Authorization/routines';

const useUser = () => {
    const dispatch: Dispatch = useDispatch();
    const user = useSelector((rootState: RootState) => getAppState(rootState).user);

    const onLogout = () => {
        dispatch({ type: LogoutRoutine.TRIGGER });
    };
    return {
        user,
        onLogout
    };
};

export default useUser;
