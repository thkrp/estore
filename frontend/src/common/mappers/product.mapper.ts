import { AppResponse, DetailedProduct, Product, Products } from 'app-shared';

class ProductMapper {
    static mapDetailedProductToProduct(detailed: DetailedProduct): Product {
        return {
            name: detailed.name,
            image: detailed.image,
            id: detailed.id,
            url: detailed.url,
            code: detailed.code,
            brand: detailed.brand,
            price: detailed.price,
            price_old: detailed.price_old,
            is_new: detailed.is_new
        };
    }

    static mapResponseToProductItems(response: AppResponse<Products>) {
        if (!response.data?.items?.length) {
            return {
                data: []
            };
        }

        return {
            data: response.data.items
        };
    }
}

export default ProductMapper;
