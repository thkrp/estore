import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserMapper } from './user.mapper';

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [UserService, UserMapper],
    controllers: [UserController],
    exports: [UserService, UserMapper]
})
export class UserModule {}
