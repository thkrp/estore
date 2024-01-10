import { PublicUser } from '../user';

export interface AuthResponse {
    accessToken: string,
    user: PublicUser | null
}