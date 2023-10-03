import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosRequest, IAxiosAdapter } from 'app-shared';
import { AxiosInstance, AxiosPromise } from 'app-shared/node_modules/axios';
import { REQUEST } from '@nestjs/core';

@Injectable()
export class AxiosAdapterService implements IAxiosAdapter {
    #adapter: AxiosInstance;

    constructor(
        @Inject(REQUEST) private request,
        private readonly httpService: HttpService
    ) {
        this.#adapter = this.httpService.axiosRef;
        this.#adapter.defaults.headers.common['locale'] = request.headers.locale;
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
