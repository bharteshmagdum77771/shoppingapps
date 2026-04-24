import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button, Badge } from 'react-bootstrap';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = useCallback(
    (e) => {
      e.preventDefault();
      addToCart(product);
    },
    [addToCart, product]
  );

  return (
    <Card
      className="h-100 shadow-sm d-flex flex-column border-0"
      style={{
        transition: 'all 0.25s ease',
      }}
    >
      {/* IMAGE */}
      <Link to={`/products/${product.id}`}>
        <Card.Img
          variant="top"
          src={product.image}
          alt={`${product.name} product image`}
          loading="lazy"
          style={{
            height: '200px',
            objectFit: 'cover',
          }}
        />
      </Link>

      {/* BODY */}
      <Card.Body className="d-flex flex-column">

        {/* BADGES */}
        <div className="mb-2">
          <Badge bg="secondary" className="me-2">
            {product.category}
          </Badge>

          <Badge bg={product.inStock ? 'success' : 'danger'}>
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </Badge>
        </div>

        {/* TITLE + INFO (flex-grow-1 ensures equal height) */}
        <Link
          to={`/products/${product.id}`}
          className="text-decoration-none text-dark flex-grow-1"
        >
          {/* TITLE (fixed height using line clamp style inline) */}
          <h6
            className="fw-bold"
            style={{
              minHeight: '2.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.name}
          </h6>

          {/* RATING */}
          <div className="d-flex align-items-center mb-2">
            <Star size={16} fill="#ffc107" stroke="#ffc107" />
            <span className="ms-1">
              {product.rating}{' '}
              <span className="text-muted">({product.reviews})</span>
            </span>
          </div>

          {/* DESCRIPTION (fixed height for consistency) */}
          <p
            className="text-muted small mb-0"
            style={{
              minHeight: '3.5rem',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {product.description}
          </p>
        </Link>

        {/* PRICE + BUTTON (always bottom aligned) */}
        <div className="mt-auto pt-3">
          <h5 className="text-primary fw-bold mb-3">
            ${product.price.toFixed(2)}
          </h5>

          <Button
            variant="primary"
            className="w-100 d-flex align-items-center justify-content-center gap-2"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </Button>
        </div>

      </Card.Body>
    </Card>
  );
}