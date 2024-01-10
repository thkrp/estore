import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { ApplicationException } from '../../exception/application.exception';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create.user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly userMapper: UserMapper
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const user = await this.getUserByEmail(dto.email);
        if (user) {
            throw ApplicationException.badRequest('User already exists');
        }
        const entity = {
            email: dto.email,
            password: dto.password
        };

        return await this.userRepository.save(entity);
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { email } });
    }

    async getUserById(id: string): Promise<User | null> {
        return await this.userRepository.findOne({ where: { id } });
    }

    async getUsers() {
        return [];
    }
}
