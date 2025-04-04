export interface Author {
    firstName: string;
    lastName: string;
    email: string;
    gender: string;
    avatar: string;
    onlineStatus: 'online' | 'offline' | 'idle';
}

export interface Product {
    id: number;
    title: string;
    category: string;
    price: number;
    isFavorite?: boolean;
    createdAt: number;
    theme: string;
    tier: string;
    imageId: number;
    author: Author;
}

export interface ProductImage {
    id: number;
    link: string;
    productId: number;
}

export interface ProductDetailProps extends Product {
    loading?: boolean;
    imageUrl?: string | null;
}

export interface ProductListProps {
    items: ProductDetailProps[];
    loading: boolean;
    hasMore: boolean;
    onLoadMore: () => Promise<void>;
    error?: Error | null;
}

export interface SearchProductParams {
    tier: string;
    theme: string;
    searchTerm?: string;
    pageIndex: number;
    pageSize: number;
    fromPrice: number;
    toPrice: number;
    order: string;
    fromTime: number | null;
    toTime: number | null;
}

export interface ProductResponse {
    data: Product[];
    totalCount: number;
}