import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'app-shared';

export const ROLES = 'roles';
export const HasRoles = (...hasRoles: UserRole[]) => SetMetadata(ROLES, hasRoles);
