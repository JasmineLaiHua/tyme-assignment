import { Row, Col, Grid, Result } from 'antd';
import { FixedSizeList as List } from 'react-window';
import ProductDetail from './ProductDetail';
import '@/styles/components/ProductList.scss';
import { ProductListProps } from '@/types/product.type';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PRODUCT_CONTAINER_HEIGHT, PRODUCT_ROW_HEIGHT } from '@/constants/product';
import React from 'react';

const { useBreakpoint } = Grid;

const ProductList = ({ items, loading, hasMore, onLoadMore, error }: ProductListProps) => {
    const screens = useBreakpoint();
    const [colCount, setColCount] = useState(4);

    useEffect(() => {
        if (screens.lg) setColCount(4);
        else if (screens.md) setColCount(3);
        else if (screens.sm) setColCount(2);
        else setColCount(1);
    }, [screens]);

    const rowCount = useMemo(() => Math.ceil(items.length / colCount), [items, colCount]);

    const CustomRow = useCallback(({ index, style }: { index: number; style: React.CSSProperties }) => {
        const startIndex = index * colCount;
        const rowItems = items.slice(startIndex, startIndex + colCount);

        return (
            <div style={style}>
                <Row gutter={[16, 16]}>
                    {rowItems.map((item, colIndex) => (
                        <Col
                            xs={24}
                            sm={12}
                            md={8}
                            lg={6}
                            key={item.id || colIndex}
                        >
                            <ProductDetail {...item} />
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }, [items, colCount]);

    const onScroll = useCallback(({ scrollOffset }: { scrollOffset: number; scrollDirection: string }) => {
        const totalHeight = rowCount * PRODUCT_ROW_HEIGHT;
        const scrollThreshold = 0.8;

        if (!loading && hasMore && (scrollOffset / (totalHeight - PRODUCT_CONTAINER_HEIGHT)) > scrollThreshold) {
            onLoadMore();
        }
    }, [loading, hasMore, rowCount, onLoadMore]);

    if (error) {
        return (
            <Result
                status="error"
                title="Error"
                subTitle={error.message}
            />
        );
    }

    if (!items.length) {
        return (
            <Result
                status="info"
                title="No products found"
            />
        );
    }

    return (
        <div style={{ width: '100%' }}>
            <List
                height={PRODUCT_CONTAINER_HEIGHT}
                itemCount={rowCount}
                itemSize={PRODUCT_ROW_HEIGHT}
                width="100%"
                onScroll={onScroll}
            >
                {CustomRow}
            </List>
        </div>
    );
};

export default React.memo(ProductList);
