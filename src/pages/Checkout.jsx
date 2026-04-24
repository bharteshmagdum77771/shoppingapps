import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Container, Row, Col, Card, Form, Button, ListGroup, Alert } from 'react-bootstrap';
import { CreditCard, MapPin, User, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export function Checkout() {
  const navigate = useNavigate();
  const { cart, totalPrice, clearCart } = useCart();
  const [validated, setValidated] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const shippingCost = totalPrice >= 50 ? 0 : 9.99;
  const tax = totalPrice * 0.1;
  const total = totalPrice + shippingCost + tax;

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
    } else {
      setOrderPlaced(true);
      // Simulate order processing
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 3000);
    }
  };

  if (cart.length === 0 && !orderPlaced) {
    navigate('/cart');
    return null;
  }

  if (orderPlaced) {
    return (
      <Container className="py-5">
        <div className="text-center py-5">
          <div 
            className="rounded-circle bg-success d-inline-flex align-items-center justify-content-center mb-4"
            style={{ width: '100px', height: '100px' }}
          >
            <Check size={60} className="text-white" />
          </div>
          <h1 className="fw-bold mb-3">Order Placed Successfully!</h1>
          <p className="text-muted mb-4">
            Thank you for your purchase. You will receive a confirmation email shortly.
          </p>
          <p className="text-muted">Redirecting to homepage...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">Checkout</h1>

      <Row className="g-4">
        <Col lg={8}>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/* Contact Information */}
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white d-flex align-items-center gap-2">
                <User size={20} />
                Contact Information
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="John"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your first name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="Doe"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your last name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control 
                        type="email" 
                        placeholder="john@example.com"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Phone</Form.Label>
                      <Form.Control 
                        type="tel" 
                        placeholder="(555) 123-4567"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your phone number.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Shipping Address */}
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white d-flex align-items-center gap-2">
                <MapPin size={20} />
                Shipping Address
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Street Address</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="123 Main St"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your street address.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>City</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="New York"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your city.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>State</Form.Label>
                      <Form.Select required>
                        <option value="">Choose...</option>
                        <option value="NY">NY</option>
                        <option value="CA">CA</option>
                        <option value="TX">TX</option>
                        <option value="FL">FL</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Please select a state.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>ZIP Code</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="10001"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a ZIP code.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Payment Information */}
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white d-flex align-items-center gap-2">
                <CreditCard size={20} />
                Payment Information
              </Card.Header>
              <Card.Body>
                <Row className="g-3">
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="1234 5678 9012 3456"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid card number.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group>
                      <Form.Label>Cardholder Name</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="John Doe"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide the cardholder name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Expiration Date</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="MM/YY"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide the expiration date.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>CVV</Form.Label>
                      <Form.Control 
                        type="text" 
                        placeholder="123"
                        required 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide the CVV.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Button type="submit" variant="primary" size="lg" className="w-100">
              Place Order - ${total.toFixed(2)}
            </Button>
          </Form>
        </Col>

        <Col lg={4}>
          <Card className="sticky-top" style={{ top: '100px' }}>
  <Card.Body>
    <h5 className="fw-bold mb-4">Order Summary</h5>

    {/* ITEMS */}
    <ListGroup variant="flush" className="mb-3">
      {cart.map((item) => (
        <ListGroup.Item key={item.id} className="px-0">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="small">{item.name}</div>
              <div className="small text-muted">
                Qty: {item.quantity}
              </div>
            </div>
            <span className="fw-bold">
              ${(item.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>

    {/* PRICING */}
    <div className="d-flex justify-content-between mb-2">
      <span>Subtotal</span>
      <span>${totalPrice.toFixed(2)}</span>
    </div>

    <div className="d-flex justify-content-between mb-2">
      <span>Shipping</span>
      <span className={shippingCost === 0 ? 'text-success' : ''}>
        {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
      </span>
    </div>

    <div className="d-flex justify-content-between mb-2">
      <span>Tax (10%)</span>
      <span>${tax.toFixed(2)}</span>
    </div>

    <hr />

    <div className="d-flex justify-content-between">
      <strong>Total</strong>
      <strong className="text-primary">
        ${total.toFixed(2)}
      </strong>
    </div>
  </Card.Body>
</Card>
        </Col>
      </Row>
    </Container>
  );
}
