import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UpdatePublicUser, UserList } from 'app-shared';
import { ApplicationException } from '../../exception/application.exception';
import { PaginationDto } from '../common/dto/pagination.dto';
import { FilterOptionsDto } from '../common/dto/filter.options.dto';
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

    async #existingUser(email: string) {
        const user = await this.userRepository.findOne({ where: { email }, withDeleted: true });
        return {
            exists: !!user,
            isDeleted: !!user?.deletedAt
        };
    }

    async createUser(dto: CreateUserDto): Promise<User> {
        const res = await this.#existingUser(dto.email);
        if (res.isDeleted) {
            throw ApplicationException.badRequest('User has been deleted');
        }
        if (res.exists) {
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

    async getUsers({ paginationOptions, order, search }: FilterOptionsDto): Promise<UserList> {
        const totalAmount = await this.userRepository.count({
            where: {
                email: search ? Like(`%${search}%`) : undefined
            }
        });
        const paginationParam = new PaginationDto(paginationOptions!, totalAmount);
        const [users, totalCount] = await this.userRepository.findAndCount({
            where: {
                email: search ? Like(`%${search}%`) : undefined
            },
            order: {
                createdAt: order
            },
            skip: paginationParam.skip,
            take: paginationParam.amount
        });

        return {
            users: users.map(this.userMapper.mapUserToPublicUser),
            totalCount
        };
    }

    async deleteUsers(users: string[]) {
        return await this.userRepository.softDelete({ id: In(Object.values(users)) });
    }

    async updateUsers(users: UpdatePublicUser[]) {
        return await Promise.all(
            users.map(user => {
                return this.userRepository.update(
                    {
                        id: user.id
                    },
                    { ...user }
                );
            })
        );
    }
}
