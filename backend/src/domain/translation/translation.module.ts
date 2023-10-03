import { Module } from '@nestjs/common';
import { TranslationController } from './translation.controller';
import { TranslationService } from './translation.service';

@Module({
    providers: [TranslationService],
    controllers: [TranslationController]
})
export class TranslationModule {}
