import { ApiProperty } from '@nestjs/swagger';
import { TranslationHashResponse } from 'app-shared';

export class TranslationHashDto implements TranslationHashResponse {
    @ApiProperty()
    translationHash: string;
}
