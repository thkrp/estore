import { IsEnum, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { FilterOptions, Order } from 'app-shared';
import { PaginationOptionsDto } from './pagination.options.dto';

export class FilterOptionsDto implements FilterOptions {
    @ValidateNested()
    @Type(() => PaginationOptionsDto)
    @IsOptional()
    paginationOptions?: PaginationOptionsDto = new PaginationOptionsDto();

    @IsString()
    @IsOptional()
    search?: string;

    @ApiPropertyOptional({ enum: Order, default: Order.ASC })
    @IsEnum(Order)
    @IsOptional()
    readonly order?: Order = Order.ASC;
}
