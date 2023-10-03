import { AxiosPromise, AxiosRequestHeaders } from 'axios';

export interface AxiosRequest {
    url: string;
    payload?: any;
    headers?: AxiosRequestHeaders;
    queryParams?: any;
}

export interface IAxiosAdapter {
    doGet: <T>(dto: AxiosRequest) => AxiosPromise<T>;
    doPost: <T>(dto: AxiosRequest) => AxiosPromise<T>;
    doPut: <T>(dto: AxiosRequest) => AxiosPromise<T>;
    doPatch: <T>(dto: AxiosRequest) => AxiosPromise<T>;
    doDelete: <T>(dto: AxiosRequest) => AxiosPromise<T>;
}
