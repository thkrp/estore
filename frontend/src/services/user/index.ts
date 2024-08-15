import { AppResponse, FilterOptions, UpdatePublicUser } from 'app-shared';
import { axiosAdapter } from '../../common/helpers/axios-adatpter';

const searchParamsToSearchString = (params?: FilterOptions) => {
    if (!params) {
        return '';
    }
    const string = Object.entries(params).reduce((search, [key, value]): string => {
        if (typeof value === 'string') {
            return `${search}${key}=${value}&`;
        }
        return Object.entries(value).reduce((nested, [nestedKey, nestedValue]) => {
            return `${nested}${key}[${nestedKey}]=${nestedValue}&`;
        }, search);
    }, '');
    return string.substring(0, string.length - 1);
};

class UserService {
    async getUsers(filterOptions?: FilterOptions): Promise<AppResponse<[]>> {
        const search = searchParamsToSearchString(filterOptions);
        const urlWithSearch = `/v1/users${search ? `?${search}` : ''}`;
        const { data } = await axiosAdapter.doGet<AppResponse<[]>>({
            url: urlWithSearch
        });

        return data;
    }

    async deleteUsers(userIds: string[]) {
        await axiosAdapter.doDelete({
            url: '/v1/users',
            queryParams: userIds
        });
    }

    async updateUsers(users: UpdatePublicUser[]) {
        await axiosAdapter.doPatch({
            url: '/v1/users',
            payload: users
        });
    }
}

export const userService = new UserService();
