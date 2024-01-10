import { Controller, Get, Version } from '@nestjs/common';
import { ApplicationException } from '../../exception/application.exception';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Version('1')
    @Get()
    async getUsers() {
        try {
            return {
                data: await this.userService.getUsers()
            };
        } catch (e) {
            throw ApplicationException.wrapError(e);
        }
    }
}
