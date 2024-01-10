import { Product } from './product';

export interface Products {
    items: Product[],
    total_count: number,
    pageSize: number
}
