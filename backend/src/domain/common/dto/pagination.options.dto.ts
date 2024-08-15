import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { PageSize, PaginationOptions } from 'app-shared';
import { Type } from 'class-transformer';

export class PaginationOptionsDto implements PaginationOptions {
    @ApiPropertyOptional({
        minimum: 1,
        default: 1
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    readonly page: number = 1;

    @ApiPropertyOptional({
        minimum: PageSize.Min,
        maximum: PageSize.Max,
        default: PageSize.Default
    })
    @Type(() => Number)
    @IsInt()
    @Min(PageSize.Min)
    @Max(PageSize.Max)
    @IsOptional()
    readonly pageSize?: number = PageSize.Default;
}
