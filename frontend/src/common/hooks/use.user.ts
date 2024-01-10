import { useSelector } from 'react-redux';
import { RootState } from '../../store/types/root.state';
import { getAppState } from '../helpers/get.state.helper';

const useUser = () => {
    return useSelector((rootState: RootState) => getAppState(rootState).user);
};

export default useUser;
