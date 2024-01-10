import { ApiProperty } from '@nestjs/swagger';

export class TranslationResponseDto {
    @ApiProperty()
    translation: object;
}
