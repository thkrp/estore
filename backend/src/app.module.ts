import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DomainModule } from './domain/domain.module';
import { AppConfig } from './app-config/app.config';
import { TypeOrmOptionsFactoryImpl } from './app-config/typeorm.options.factory.impl';

const configModuleOptions: ConfigModuleOptions = {
    envFilePath: '.env',
    isGlobal: true
};

@Module({
    imports: [
        ConfigModule.forRoot(configModuleOptions),
        AppConfig,
        TypeOrmModule.forRootAsync({
            useClass: TypeOrmOptionsFactoryImpl
        }),
        DomainModule
    ]
})
export class AppModule {}
