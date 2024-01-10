import { IsEmail, IsString, Length, Matches } from 'class-validator';
import { IsEqualTo } from '../../common/decorators/is.equal.to';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    @IsEmail()
    @Length(1, 320)
    email: string;

    @ApiProperty()
    @IsString()
    @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,32}$/, { message: 'Password is too weak' })
    password: string;

    @ApiProperty()
    @IsString()
    @IsEqualTo('password')
    confirmPassword: string;
}
