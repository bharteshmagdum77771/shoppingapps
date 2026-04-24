import { Link } from 'react-router-dom';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Alert,
} from 'react-bootstrap';
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Cart() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();

  const shipping = totalPrice >= 50 ? 0 : 9.99;
  const tax = totalPrice * 0.1;
  const finalTotal = totalPrice + shipping + tax;

  if (cart.length === 0) {
    return (
      <Container className="py-5 position-relative d-flex flex-column justify-content-center align-items-center text-center"
  style={{ zIndex: 1, minHeight: '60vh' }}>
        <ShoppingBag size={80} className="text-muted mb-4" />
        <h2 className="mb-3">Your Cart is Empty</h2>
        <p className="text-muted mb-4">
          Add some products to get started!
        </p>
        <Button as={Link} to="/products" variant="primary" size="lg">
          Shop Now
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Shopping Cart</h1>

      <Row className="g-4 align-items-start">

        {/* CART ITEMS */}
        <Col lg={8}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">

                {cart.map((item) => (
                  <ListGroup.Item key={item.id} className="py-3">

                    <Row className="align-items-center g-3">

                      {/* IMAGE */}
                      <Col xs={12} sm={3}>
                        <img
                          src={item.image}
                          alt={item.name}
                          loading="lazy"
                          className="img-fluid rounded"
                          style={{
                            maxHeight: '100px',
                            objectFit: 'cover',
                          }}
                        />
                      </Col>

                      {/* INFO */}
                      <Col xs={12} sm={4}>
                        <Link
                          to={`/products/${item.id}`}
                          className="text-decoration-none text-dark"
                        >
                          <h6 className="mb-1">{item.name}</h6>
                        </Link>

                        <p className="text-muted small mb-0">
                          {item.category}
                        </p>

                        <p className="text-primary fw-bold mb-0">
                          ${item.price.toFixed(2)}
                        </p>
                      </Col>

                      {/* QUANTITY */}
                      <Col xs={6} sm={3}>
                        <div className="d-flex align-items-center gap-2">

                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={14} />
                          </Button>

                          <span className="fw-bold">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() =>
                              updateQuantity(
                                item.id,
                                item.quantity + 1
                              )
                            }
                          >
                            <Plus size={14} />
                          </Button>

                        </div>
                      </Col>

                      {/* TOTAL + REMOVE */}
                      <Col xs={6} sm={2} className="text-end">
                        <p className="fw-bold mb-2">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>

                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                        >
                          <Trash2 size={14} />
                        </Button>
                      </Col>

                    </Row>
                  </ListGroup.Item>
                ))}

              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* SUMMARY */}
        <Col lg={4}>
          <Card className="sticky-lg-top" style={{ top: '100px' }}>
            <Card.Body>
              <h5 className="fw-bold mb-4">Order Summary</h5>

              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span className="text-success">
                  {shipping === 0 ? 'FREE' : '$9.99'}
                </span>
              </div>

              <div className="d-flex justify-content-between mb-2">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mb-4">
                <strong>Total</strong>
                <strong className="text-primary">
                  ${finalTotal.toFixed(2)}
                </strong>
              </div>

              {totalPrice < 50 && (
                <Alert variant="info" className="small">
                  Add ${(50 - totalPrice).toFixed(2)} more for FREE shipping!
                </Alert>
              )}

              <Button
                as={Link}
                to="/checkout"
                variant="primary"
                size="lg"
                className="w-100 d-flex align-items-center justify-content-center gap-2"
              >
                Proceed to Checkout
                <ArrowRight size={20} />
              </Button>

              <Button
                as={Link}
                to="/products"
                variant="outline-secondary"
                className="w-100 mt-2"
              >
                Continue Shopping
              </Button>

            </Card.Body>
          </Card>
        </Col>

      </Row>
    </Container>
  );
}