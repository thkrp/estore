import { PublicUser } from 'app-shared';
import { User } from './user.entity';

export class UserMapper {
    mapUserToPublicUser(user: User): PublicUser {
        return {
            id: user.id!,
            email: user.email,
            isActive: user.isActive
        };
    }
}
