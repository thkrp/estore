import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService: ConfigService = app.get(ConfigService);
    app.enableCors({ origin: configService.get('FRONTEND_ORIGIN') });
    app.use(helmet());
    await app.listen(configService.get('SERVER_PORT'));
}
bootstrap().catch(err => console.error(err));
