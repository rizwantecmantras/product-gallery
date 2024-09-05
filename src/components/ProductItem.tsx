import React from "react";
import { Card, NavLink } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ProductItemProps {
  product: {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  };
  onClick: (product: {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }) => void;
}

const ProductItem: React.FC<ProductItemProps> = React.memo(
  ({ product, onClick }) => {
    return (
      <NavLink>
        <Card onClick={() => onClick(product)} className="h-100">
          <LazyLoadImage
            src={product.thumbnailUrl}
            alt={product.title}
            className="card-img-top"
            effect="blur" // Apply a blur effect while loading
            height="150px"
            style={{ objectFit: "cover" }}
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>Album ID: {product.albumId}</Card.Text>
          </Card.Body>
        </Card>
      </NavLink>
    );
  }
);

export default ProductItem;
