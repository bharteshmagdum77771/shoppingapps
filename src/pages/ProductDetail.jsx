import { useParams, Link, useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import { Container, Row, Col, Button, Badge, ListGroup } from 'react-bootstrap';
import { ArrowLeft, ShoppingCart, Star, Check } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const productId = Number(id);

  const product = useMemo(
    () => products.find((p) => p.id === productId),
    [productId]
  );

  const relatedProducts = useMemo(() => {
    if (!product) return [];

    return products
      .filter(
        (p) => p.category === product.category && p.id !== product.id
      )
      .slice(0, 4);
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (product) addToCart(product);
  }, [product, addToCart]);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2>Product not found</h2>

        <Button
          as={Link}
          to="/products"
          variant="primary"
          className="mt-3"
        >
          Back to Products
        </Button>
      </Container>
    );
  }

  return (
    <main>
      <Container className="py-5">
        <Button
          variant="outline-secondary"
          className="mb-4 d-flex align-items-center gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft size={16} />
          Back
        </Button>

        <Row className="g-4">
          <Col md={6}>
            <img
              src={product.image}
              alt={`${product.name} product image`}
              loading="lazy"
              className="img-fluid rounded shadow w-100"
            />
          </Col>

          <Col md={6}>
            <div className="mb-3">
              <Badge bg="secondary" className="me-2">
                {product.category}
              </Badge>

              <Badge bg={product.inStock ? 'success' : 'danger'}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </Badge>
            </div>

            <h1 className="fw-bold mb-3">{product.name}</h1>

            <div className="d-flex align-items-center mb-3">
              <Star size={18} fill="#ffc107" stroke="#ffc107" />
              <span className="ms-2 fw-bold">{product.rating}</span>
              <span className="text-muted ms-2">
                ({product.reviews} reviews)
              </span>
            </div>

            <h2 className="text-primary mb-4">
              ${product.price.toFixed(2)}
            </h2>

            <p className="text-muted mb-4">{product.description}</p>

            {product.features?.length > 0 && (
              <section className="mb-4">
                <h5 className="fw-bold mb-3">Key Features</h5>

                <ListGroup>
                  {product.features.map((feature) => (
                    <ListGroup.Item
                      key={feature}
                      className="d-flex align-items-center gap-2"
                    >
                      <Check size={16} className="text-success" />
                      {feature}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </section>
            )}

            <div className="d-flex gap-3 flex-wrap">
              <Button
                variant="primary"
                size="lg"
                className="d-flex align-items-center gap-2"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>

              <Button
                as={Link}
                to="/cart"
                variant="outline-primary"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                Buy Now
              </Button>
            </div>
          </Col>
        </Row>

        {relatedProducts.length > 0 && (
          <section className="mt-5">
            <h3 className="fw-bold mb-4">You May Also Like</h3>

            <Row className="g-4">
              {relatedProducts.map((item) => (
                <Col key={item.id} sm={6} md={4} lg={3}>
                  <Link
                    to={`/products/${item.id}`}
                    className="text-decoration-none"
                  >
                    <div className="card h-100 shadow-sm">
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="card-img-top"
                        style={{
                          height: '200px',
                          objectFit: 'cover',
                        }}
                      />

                      <div className="card-body">
                        <h6 className="card-title text-dark">
                          {item.name}
                        </h6>

                        <p className="text-primary fw-bold mb-0">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
            </Row>
          </section>
        )}
      </Container>
    </main>
  );
}