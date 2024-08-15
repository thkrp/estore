import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { WinstonModuleOptions, WinstonModuleOptionsFactory } from 'nest-winston';
import * as winston from 'winston';
import * as dayjs from 'dayjs';
import { getProjectRoot } from '../utils/file.system.utils';

@Injectable()
export class WinstonOptionsFactoryImpl implements WinstonModuleOptionsFactory {
    createWinstonModuleOptions(): Promise<WinstonModuleOptions> | WinstonModuleOptions {
        const date = dayjs();
        const filename = `${date.year()}-${date.month()}`;
        return {
            format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    dirname: path.join(getProjectRoot(), './../../logs/'),
                    filename: `${filename}.log`
                })
            ]
        };
    }
}
