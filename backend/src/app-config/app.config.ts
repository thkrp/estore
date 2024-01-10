import { Module } from '@nestjs/common';
import { TypeOrmOptionsFactoryImpl } from './typeorm.options.factory.impl';

@Module({
    providers: [TypeOrmOptionsFactoryImpl],
    exports: [TypeOrmOptionsFactoryImpl]
})
export class AppConfig {}
