import { Column, Entity, OneToMany } from 'typeorm';
import { UserRole } from 'app-shared';
import { BaseEntity } from '../common/entity/base.entity';
import { RefreshToken } from '../refresh-token/refresh.token.entity';

@Entity({
    name: 'app_user'
})
export class User extends BaseEntity {
    @Column({
        name: 'email',
        type: 'citext',
        nullable: false,
        unique: true
    })
    email: string;

    @Column({
        name: 'password',
        type: 'varchar',
        nullable: false
    })
    password: string;

    @Column({
        name: 'is_active',
        type: 'boolean',
        nullable: false,
        default: false
    })
    isActive = false;

    @OneToMany(() => RefreshToken, (rt: RefreshToken) => rt.user, {
        cascade: true
    })
    refreshTokens: RefreshToken[];

    @Column({
        name: 'role',
        type: 'enum',
        enum: UserRole,
        nullable: false,
        default: UserRole.CLIENT
    })
    role: UserRole = UserRole.CLIENT;
}
