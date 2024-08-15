import { AppResponse, AxiosRequest, ErrorCodes, IAxiosAdapter, ErrorMessages, AuthResponse } from 'app-shared';
import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'app-shared/node_modules/axios';
import { Store } from '@reduxjs/toolkit';
import { env } from '../../env';
import { localStorageService } from '../../services/local-storage';
import { appUserUpdateRoutine } from '../../store/app/routines';
import type { AuthService } from '../../services/auth/types/auth.service.type';

class AxiosAdapter implements IAxiosAdapter {
    #adapter: AxiosInstance;

    #store: Store;

    #authService: AuthService;

    constructor() {
        this.#store = {} as Store;
        this.#authService = {} as AuthService;

        this.#adapter = axios.create({
            baseURL: env.urls.backend,
            withCredentials: true
        });

        this.#adapter.interceptors.request.use(
            async config => {
                const headers = {
                    ...config.headers,
                    locale: localStorageService.getLocalization()
                };
                const { accessToken } = await this.#authService.getToken();
                if (accessToken) {
                    headers.Authorization = `Bearer ${accessToken}`;
                }
                // @ts-ignore
                // eslint-disable-next-line no-param-reassign
                config.headers = headers;
                return config;
            },
            error => Promise.reject(error)
        );

        this.#adapter.interceptors.response.use(
            (response: AxiosResponse<AppResponse<unknown>>) => {
                return response;
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            async (error: any) => {
                const code = error.response?.data?.error?.code;
                const message = error.response?.data?.error?.data?.message;
                if (
                    (code !== ErrorCodes.UNAUTHORIZED && message !== ErrorMessages.ExpiredAccessToken) ||
                    error.config.isRetry
                ) {
                    return Promise.reject(error);
                }

                try {
                    const originalRequest = error.config;
                    originalRequest.isRetry = true;
                    const { data } = await axios.post<AppResponse<AuthResponse>>('/v1/auth/refresh', null, {
                        baseURL: env.urls.backend,
                        withCredentials: true
                    });
                    const newToken = data?.data?.accessToken;
                    const user = data?.data?.user;
                    if (newToken && user) {
                        await this.#authService.setToken(newToken);
                        this.#store.dispatch({ type: appUserUpdateRoutine.SUCCESS, payload: user });
                        return await this.#adapter.request(originalRequest);
                    }
                    await this.#authService.logout();
                    return await Promise.reject();
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (e: any) {
                    const errorCode = e.response?.data?.error?.code;
                    if (errorCode === ErrorCodes.UNAUTHORIZED) {
                        await this.#authService.logout();
                    }

                    return await Promise.reject(e);
                }
            }
        );
    }

    injectStore(store: Store) {
        this.#store = store;
    }

    injectAuthService(service: AuthService) {
        this.#authService = service;
    }

    doDelete<T>(dto: AxiosRequest): AxiosPromise<T> {
        const { url, headers, queryParams } = dto;
        return this.#adapter.delete(url, {
            headers,
            params: queryParams
        });
    }

    doGet<T>(dto: AxiosRequest): AxiosPromise<T> {
        const { url, headers, queryParams } = dto;
        return this.#adapter.get(url, {
            headers,
            params: queryParams
        });
    }

    doPatch<T>(dto: AxiosRequest): AxiosPromise<T> {
        const { url, payload, headers, queryParams } = dto;
        return this.#adapter.patch(url, payload, {
            headers,
            params: queryParams
        });
    }

    doPost<T>(dto: AxiosRequest): AxiosPromise<T> {
        const { url, payload, headers, queryParams } = dto;
        return this.#adapter.post(url, payload, {
            headers,
            params: queryParams
        });
    }

    doPut<T>(dto: AxiosRequest): AxiosPromise<T> {
        const { url, payload, headers, queryParams } = dto;
        return this.#adapter.put(url, payload, {
            headers,
            params: queryParams
        });
    }
}

export const axiosAdapter = new AxiosAdapter();
