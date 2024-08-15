import { AppResponse, AuthResponse, Login } from 'app-shared';
import axios from 'app-shared/node_modules/axios';
import { localStorageService } from '../local-storage';
import { axiosAdapter } from '../../common/helpers/axios-adatpter';
import { env } from '../../env';

class AuthService {
    readonly #storageKey = 'token';

    async setToken(token: string) {
        return localStorageService.set(this.#storageKey, token);
    }

    async getToken() {
        return {
            accessToken: localStorageService.get(this.#storageKey)
        };
    }

    async login(payload: Login): Promise<AppResponse<AuthResponse>> {
        const { data } = await axiosAdapter.doPost<AppResponse<AuthResponse>>({
            url: '/v1/auth/login',
            payload
        });

        const accessToken = data?.data?.accessToken;
        if (accessToken) {
            await this.setToken(accessToken);
        }

        return data;
    }

    async logout() {
        try {
            await axiosAdapter.doPost<AppResponse<null>>({
                url: '/v1/auth/logout'
            });
            localStorageService.remove(this.#storageKey);
            return null;
        } catch (e) {
            return null;
        }
    }

    async checkAuth(): Promise<AppResponse<AuthResponse | null>> {
        const { accessToken } = await this.getToken();
        if (!accessToken) {
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
            await this.setToken(newAccessToken);
        }

        return data;
    }
}

export const authService = new AuthService();
axiosAdapter.injectAuthService(authService);
