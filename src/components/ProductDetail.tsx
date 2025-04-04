import { HeartOutlined, HeartFilled } from '@ant-design/icons';
import { Card, Avatar, Image } from 'antd';
import { useMemo, useState } from 'react';
import '@/styles/components/ProductDetail.scss';
import { ProductDetailProps, } from '@/types/product.type';
import clsx from 'clsx';
import React from 'react';
import { SiEthereum } from "react-icons/si";

const { Meta } = Card;

const ProductDetail = ({
    id,
    title,
    category = 'Epic',
    price,
    isFavorite: initialIsFavorite = false,
    theme,
    author,
    imageUrl,
    loading = false
}: ProductDetailProps) => {
    const [isFavorite, setFavorited] = useState(initialIsFavorite);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.stopPropagation();
        setFavorited(!isFavorite);
    };

    const formattedPrice = useMemo(() => `${price.toFixed(2)} ETH`, [price]);
    const authorName = useMemo(() => `${author.firstName} ${author.lastName}`, [author]);

    const cardCover = (
        <div className={clsx("card-image-container", theme)}>

            <Image
                className="card-image"
                src={imageUrl || undefined}
                alt={title}
                key={id}
                preview={false}
                placeholder={
                    <Image
                        preview={false}
                        src='src/assets/placeHolderImg.png'
                        className="card-image"
                    />
                }
            />
            <div className="card-actions">
                <span className="card-category">{category}</span>
                <button
                    className="favorite-button"
                    onClick={toggleFavorite}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                >
                    {isFavorite ? <HeartFilled /> : <HeartOutlined />}
                </button>

            </div>
        </div>

    );

    return (
        <div className="card-detail">
            <Card
                hoverable
                className="crypto-card"
                cover={cardCover}
                loading={loading}
            >
                {!loading && (
                    <>
                        <Meta
                            title={title}
                            description={
                                <div className="card-creator">
                                    <Avatar
                                        src={author.avatar}
                                        size="small"
                                        className={`creator-avatar ${author.onlineStatus}`}
                                    />
                                    <span className="creator-name">{authorName}</span>
                                </div>
                            }
                        />
                        <div className="card-price">
                            <SiEthereum />{formattedPrice}
                        </div>
                    </>
                )}
            </Card>
        </div>
    );
};

export default React.memo(ProductDetail); 