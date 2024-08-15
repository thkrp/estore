import { SetMetadata } from '@nestjs/common';

export const CAN_BE_INACTIVE = 'canBeInactive';
export const CanBeInactive = () => SetMetadata(CAN_BE_INACTIVE, true);
