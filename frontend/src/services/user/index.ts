import { AppResponse, AuthResponse } from 'app-shared';
import axios from 'app-shared/node_modules/axios';
import { axiosAdapter } from '../../common/helpers/axios-adatpter';
import { env } from '../../env';
import { authService } from '../auth';

class UserService {
    async checkAuth(): Promise<AppResponse<AuthResponse | null>> {
        const { accessToken } = await authService.getToken();
        if (!accessToken) {
            await authService.logout();
            return {
                data: null
            };
        }
        const { data } = await axios.post<AppResponse<AuthResponse>>('/v1/auth/refresh', null, {
            baseURL: env.urls.backend,
            withCredentials: true
        });
        const newAccessToken = data?.data?.accessToken;
        if (newAccessToken) {
            await authService.setToken(newAccessToken);
        }

        return data;
    }

    async getUsers(): Promise<AppResponse<[]>> {
        const { data } = await axiosAdapter.doGet<AppResponse<[]>>({
            url: '/v1/users'
        });

        return data;
    }
}

export const userService = new UserService();
