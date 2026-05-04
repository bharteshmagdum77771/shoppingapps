import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import {
  ArrowRight,
  ShoppingBag,
  Truck,
  Shield,
  Headphones,
} from 'lucide-react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Home() {
  const featuredProducts = products.slice(0, 4);

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      desc: 'On orders over $50',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      desc: '100% secure transactions',
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      desc: 'Dedicated customer service',
    },
  ];

  return (
    <div>

      {/* HERO */}
      <header
        className="text-white py-5"
        style={{
          background:
            'linear-gradient(135deg, #0d6efd 0%, #0a58ca 100%)',
        }}
      >
        <Container className="py-5">
          <Row>
            <Col lg={8}>
              <h1 className="display-4 fw-bold mb-4">
                Discover Amazing Tech Products
              </h1>

              <p className="lead mb-4">
                Shop the latest electronics, gadgets, and accessories from top brands.
                Free shipping on orders over $50.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Button
                  as={Link}
                  to="/products"
                  variant="light"
                  size="lg"
                  className="d-inline-flex align-items-center gap-2"
                >
                  <ShoppingBag size={20} />
                  Shop Now
                  <ArrowRight size={20} />
                </Button>

                <Button
                  as={Link}
                  to="/products"
                  variant="outline-light"
                  size="lg"
                >
                  Browse Categories
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </header>

      {/* FEATURES */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="g-4">

            {features.map((f, i) => {
              const Icon = f.icon;

              return (
                <Col md={4} key={i}>
                  <div className="text-center p-4">
                    <div
                      className="rounded-circle bg-primary bg-opacity-10 d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: '80px', height: '80px' }}
                    >
                      <Icon size={40} className="text-primary" />
                    </div>

                    <h5 className="fw-semibold">{f.title}</h5>
                    <p className="text-muted">{f.desc}</p>
                  </div>
                </Col>
              );
            })}

          </Row>
        </Container>
      </section>

      {/* PRODUCTS */}
      <section className="py-5">
        <Container>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="fw-bold">Featured Products</h2>
              <p className="text-muted">
                Check out our most popular items
              </p>
            </div>

            <Button
              as={Link}
              to="/products"
              variant="outline-primary"
              className="d-inline-flex align-items-center gap-2"
            >
              View All
              <ArrowRight size={16} />
            </Button>
          </div>

          <Row className="g-4">
            {featuredProducts.map((product) => (
              <Col key={product.id} xs={6} sm={4} md={3} lg={3}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-5 bg-dark text-white">
        <Container className="text-center py-5">

          <h2 className="display-5 fw-bold mb-3">
            Ready to Start Shopping?
          </h2>

          <p
            className="lead mb-4 mx-auto"
            style={{ maxWidth: '600px' }}
          >
            Join thousands of satisfied customers and discover the best tech products at unbeatable prices.
          </p>

          <Button
            as={Link}
            to="/products"
            variant="primary"
            size="lg"
            className="d-inline-flex align-items-center gap-2"
          >
            Explore Products
            <ArrowRight size={20} />
          </Button>

        </Container>
      </section>

    </div>
  );
}