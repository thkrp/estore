import { AppResponse, AuthResponse, Login } from 'app-shared';
import { localStorageService } from '../local-storage';
import { axiosAdapter } from '../../common/helpers/axios-adatpter';

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
        return localStorageService.remove(this.#storageKey);
    }
}

export const authService = new AuthService();
axiosAdapter.injectAuthService(authService);
