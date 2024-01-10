import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { BaseEntity } from '../common/entity/base.entity';

@Entity({
    name: 'refresh_token'
})
export class RefreshToken extends BaseEntity {
    @Column({
        name: 'token_hash',
        nullable: false,
        type: 'varchar',
        length: 255
    })
    tokenHash: string;

    @Index()
    @ManyToOne(() => User, user => user.refreshTokens, {
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        orphanedRowAction: 'delete'
    })
    @JoinColumn({
        name: 'user_id'
    })
    user: User;
}
