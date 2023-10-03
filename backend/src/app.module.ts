import { Module } from '@nestjs/common';
import { ConfigModule, ConfigModuleOptions } from '@nestjs/config';
import { DomainModule } from './domain/domain.module';

const configModuleOptions: ConfigModuleOptions = {
    envFilePath: '.env',
    isGlobal: true
};

@Module({
    imports: [ConfigModule.forRoot(configModuleOptions), DomainModule]
})
export class AppModule {}
