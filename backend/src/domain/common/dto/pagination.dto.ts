import { PageSize } from 'app-shared';
import { PaginationOptionsDto } from './pagination.options.dto';

export class PaginationDto {
    private readonly page: number;

    private readonly pageSize: number;

    private readonly totalAmount: number | undefined;

    constructor({ page, pageSize }: PaginationOptionsDto, totalAmount?: number | undefined) {
        this.page = page || 1;
        this.pageSize = pageSize || PageSize.Default;
        this.totalAmount = totalAmount;
    }

    get skip(): number {
        const skipValue = (this.page - 1 || 1 - 1) * (this.pageSize || PageSize.Default);
        if (this.totalAmount && skipValue > this.totalAmount) {
            return (1 - 1) * (this.pageSize || PageSize.Default);
        }
        return (this.page - 1 || 1 - 1) * (this.pageSize || PageSize.Default);
    }

    get amount(): number {
        return this.pageSize;
    }
}
