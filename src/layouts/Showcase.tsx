import { useState, useEffect } from 'react';
import { Row, Col, Spin, Typography } from 'antd';
import '@/styles/layouts/Showcase.scss';
import { getHighestPriceProducts, getImage } from '@/services/product.service';
import { ProductImage, ProductDetailProps } from '@/types/product.type';
import ProductDetail from '@/components/ProductDetail';

const { Title } = Typography;

const Showcase = () => {
    const [products, setProducts] = useState<ProductDetailProps[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const products = await getHighestPriceProducts();
                const imageIds = products.map(item => item.imageId);
                const images: ProductImage[] = await getImage(imageIds);

                const productsWithImages = products.map(product => ({
                    ...product,
                    imageUrl: images.find(img => img.id === product.imageId)?.link,
                    background: 'dark' // Add default background for ProductDetail
                }));

                setProducts(productsWithImages);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="showcase">
            <div className="showcase-content">
                <Title level={2} className="showcase-title">
                    Top <span style={{ color: '#8b4fd8' }}>Premium</span> NFTs
                </Title>
                <div className="showcase-cards">
                    {loading ? (
                        <div className="loading-container">
                            <Spin size="large" />
                        </div>
                    ) : (
                        <Row gutter={[24, 24]} justify="center" align="middle">
                            {products.map((product, index) => (
                                <Col
                                    key={product.id}
                                    xs={24}
                                    sm={12}
                                    md={8}
                                    lg={6}
                                    xl={4}
                                    className={`showcase-card showcase-card-${index}`}
                                >
                                    <ProductDetail {...product} />
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Showcase;
