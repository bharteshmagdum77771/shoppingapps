import { useState, useMemo } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { products, categories } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export function Products() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  // ✅ MEMOIZED FILTER
  const filteredProducts = useMemo(() => {
    return selectedCategory === 'All'
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );
  }, [selectedCategory]);

  // ✅ MEMOIZED SORT
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  return (
    <Container className="py-5">
      <h1 className="fw-bold mb-4">All Products</h1>

      {/* FILTERS */}
      <Row className="mb-4">
        <Col lg={12}>
          <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mb-4">

            {/* CATEGORY */}
            <div>
              <Form.Label className="fw-bold mb-2">
                Category
              </Form.Label>

              <div className="d-flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={
                      selectedCategory === category
                        ? 'primary'
                        : 'outline-primary'
                    }
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* SORT */}
            <div>
              <Form.Label className="fw-bold mb-2">
                Sort By
              </Form.Label>

              <Form.Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-auto"
              >
                <option value="default">Default</option>
                <option value="price-low">
                  Price: Low to High
                </option>
                <option value="price-high">
                  Price: High to Low
                </option>
                <option value="rating">
                  Highest Rated
                </option>
                <option value="name">
                  Name: A-Z
                </option>
              </Form.Select>
            </div>

          </div>
        </Col>
      </Row>

      {/* COUNT */}
      <p className="text-muted mb-4">
        Showing {sortedProducts.length} product
        {sortedProducts.length !== 1 ? 's' : ''}
      </p>

      {/* GRID */}
      <Row className="g-4">
        {sortedProducts.map((product) => (
          <Col key={product.id} sm={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {/* EMPTY STATE */}
      {sortedProducts.length === 0 && (
        <div className="text-center py-5">
          <h3>No products found</h3>
          <p className="text-muted">
            Try selecting a different category
          </p>
        </div>
      )}
    </Container>
  );
}