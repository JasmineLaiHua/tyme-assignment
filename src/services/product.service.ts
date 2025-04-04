import apiClient from '@/api/apiClient';
import { Product, SearchProductParams, ProductImage, ProductResponse, } from '@/types/product.type';

export async function searchProducts(searchParams?: SearchProductParams): Promise<ProductResponse> {
    try {
        const {
            pageIndex,
            pageSize,
            fromPrice,
            toPrice,
            tier,
            theme,
            searchTerm,
            order,
            fromTime,
            toTime,
        } = searchParams || {};
        const response = await apiClient.get<Product[]>('/products', {
            params: {
                _page: pageIndex || 1,
                _limit: pageSize || 10,
                price_gte: fromPrice,
                price_lte: toPrice,
                tier,
                theme,
                _order: order,
                q: searchTerm,
                _sort: "price",
                createdAt_gte: fromTime,
                createdAt_lte: toTime,
            }
        });
        return {
            data: response.data,
            totalCount: Number(response.headers['x-total-count']),
        };
    } catch (err) {
        const error = err as Error;
        throw new Error(error.message || 'Failed to fetch products');
    }
}

export async function getImage(ids: number[]): Promise<ProductImage[]> {
    try {
        const uniqueIds = [...new Set(ids)];
        const query = uniqueIds.map(id => `id=${id}`).join("&");
        const response = await apiClient.get<ProductImage[]>(`/images?${query}`);
        return response.data;
    } catch (error) {
        throw new Error();
    }
}

export async function getHighestPriceProducts(): Promise<Product[]> {
    try {
        const response = await apiClient.get<Product[]>('/products', {
            params: {
                _sort: "price",
                _order: "desc",
                _limit: 5,
            }
        });
        return response.data;
    } catch (error) {
        throw new Error();
    }
}

