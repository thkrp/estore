import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WinstonModule } from 'nest-winston';
import { DomainModule } from './domain/domain.module';
import { AppConfig } from './app-config/app.config';
import { TypeOrmOptionsFactoryImpl } from './app-config/typeorm.options.factory.impl';
import { WinstonOptionsFactoryImpl } from './app-config/winston.options.factory.impl';
import { LoggerMiddleware } from './logger/logger.middleware';

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
        WinstonModule.forRootAsync({
            useClass: WinstonOptionsFactoryImpl
        }),
        DomainModule
    ]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
