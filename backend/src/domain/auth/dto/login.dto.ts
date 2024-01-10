import { IsEmail, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Login } from 'app-shared';

export class LoginDto implements Login {
    @ApiProperty()
    @IsString()
    @IsEmail()
    @Length(1, 320)
    email: string;

    @ApiProperty()
    @IsString()
    @Length(1, 32)
    password: string;
}
