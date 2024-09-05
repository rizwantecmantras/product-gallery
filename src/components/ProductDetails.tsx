import React from "react";
import { Modal, Button } from "react-bootstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

interface ProductDetailsProps {
  product: {
    title: string;
    url: string;
    albumId: number;
  };
  show: boolean;
  onHide: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  show,
  onHide,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Product Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <LazyLoadImage
          src={product.url}
          alt={product.title}
          className="card-img-top"
          effect="blur" // Apply a blur effect while loading
          height="300px"
          width="100%"
          style={{ objectFit: "cover" }}
        />
        <h5>{product.title}</h5>
        <p>Album ID: {product.albumId}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetails;
