import { Brand } from './brand';

export interface Product {
    name: string;
    image: string;
    id: string;
    url: string;
    code: string;
    brand?: Brand;
    price: string;
    price_old?: string;
    is_new?: boolean;
}

export interface DetailedProduct extends Product {
    text?: string;
}
