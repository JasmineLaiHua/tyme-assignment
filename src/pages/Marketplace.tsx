import { useState, useEffect, useCallback } from 'react';
import Filter from '@/components/Filter';
import { FilterParams } from '@/types/filter.type';
import ProductList from '@/components/ProductList';
import '@/styles/pages/Marketplace.scss';
import { searchProducts, getImage } from '@/services/product.service';
import { SearchProductParams, ProductImage, ProductDetailProps } from '@/types/product.type';
import { DateRange } from '@/constants/date';

const Marketplace = () => {
    const [searchParams, setSearchParams] = useState<SearchProductParams>({
        pageIndex: 1,
        pageSize: 10,
        fromPrice: 0,
        toPrice: 200,
        tier: 'Basic',
        theme: 'Halloween',
        searchTerm: '',
        order: 'asc',
        fromTime: DateRange.lastYear.start,
        toTime: DateRange.lastYear.end,
    });
    const [items, setItems] = useState<ProductDetailProps[]>([]);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState<Error | null>(null);

    const fetchItems = useCallback(async () => {
        if (loading) return;

        setLoading(true);
        setError(null);

        try {
            const res = await searchProducts(searchParams);

            const imageIds = res.data.map(item => item.imageId);
            const images: ProductImage[] = await getImage(imageIds);
            const resData: ProductDetailProps[] = res.data.map(d => {
                const foundLink = images.find(i => i.id === d.imageId);
                return {
                    ...d,
                    imageUrl: foundLink?.link,
                }
            })

            const newItems = [...items, ...resData];

            setItems(newItems);
            setTotalCount(res.totalCount);
            setLoading(false);
            setHasMore(newItems.length >= res.totalCount ? false : true);
        } catch (error) {
            setError(error as Error);
            setLoading(false);
        }
    }, [loading, searchParams, items]);

    const handleSearch = useCallback((query: FilterParams) => {
        setItems([]);
        setError(null);
        setSearchParams({
            ...searchParams,
            tier: query.tier,
            theme: query.theme,
            order: query.order,
            searchTerm: query.searchTerm,
            fromPrice: query.priceRange[0],
            toPrice: query.priceRange[1],
            pageIndex: 1,
            fromTime: query.timeRange && query.timeRange[0],
            toTime: query.timeRange && query.timeRange[1],
        });
    }, [searchParams, setItems, setError, setSearchParams]);

    const loadMore = useCallback(() => {
        if (loading && !hasMore) return;
        setSearchParams(prev => ({
            ...prev,
            pageIndex: prev.pageIndex + 1,
        }));
    }, [loading, hasMore, setSearchParams]);

    useEffect(() => {
        fetchItems();
    }, [searchParams]);

    return (
        <div className="marketplace">
            <div className="marketplace-container">
                <aside className="filter-section">
                    <Filter onFilterChange={handleSearch} />
                </aside>
                <main className="content-section">
                    <ProductList
                        items={items}
                        loading={loading}
                        hasMore={hasMore}
                        totalCount={totalCount}
                        onLoadMore={loadMore}
                        error={error}
                        onRetry={fetchItems}
                    />
                </main>
            </div>
        </div>
    );
};

export default Marketplace;
