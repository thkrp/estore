import { Body, Controller, Delete, Get, Patch, Query, Version } from '@nestjs/common';
import { UpdatePublicUser, UserRole } from 'app-shared';
import { ApplicationException } from '../../exception/application.exception';
import { HasRoles } from '../auth/decorators/has.roles';
import { FilterOptionsDto } from '../common/dto/filter.options.dto';
import { UserService } from './user.service';

@HasRoles(UserRole.ADMIN)
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Version('1')
    @Get()
    async getUsers(@Query() filterOptions: FilterOptionsDto) {
        try {
            return {
                data: await this.userService.getUsers(filterOptions)
            };
        } catch (e) {
            throw ApplicationException.wrapError(e);
        }
    }

    @Version('1')
    @Delete()
    async deleteUsers(@Query() users: string[]) {
        try {
            return {
                data: await this.userService.deleteUsers(users)
            };
        } catch (e) {
            throw ApplicationException.wrapError(e);
        }
    }

    @Version('1')
    @Patch()
    async updateUsers(@Body() users: UpdatePublicUser[]) {
        try {
            return {
                data: await this.userService.updateUsers(users)
            };
        } catch (e) {
            throw ApplicationException.wrapError(e);
        }
    }
}
