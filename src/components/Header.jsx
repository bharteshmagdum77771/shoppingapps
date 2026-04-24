import { Link, useNavigate } from 'react-router';
import {
  Navbar,
  Nav,
  Container,
  Badge,
  Form,
  InputGroup,
  ListGroup,
  Button,
} from 'react-bootstrap';
import { ShoppingCart, Search, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useSearch } from '../hooks/useSearch';

export function Header() {
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const {
    query,
    setQuery,
    results,
    clearSearch,
    activeIndex,
    setActiveIndex,
  } = useSearch();

  const handleSelect = (product) => {
    clearSearch();
    navigate(`/products/${product.id}`);
  };

  // ⌨️ keyboard navigation
  const handleKeyDown = (e) => {
    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      setActiveIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    }

    if (e.key === 'ArrowUp') {
      setActiveIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    }

    if (e.key === 'Enter') {
      const selected = results[activeIndex];
      if (selected) handleSelect(selected);
    }
  };

  // 🔥 highlight match text
  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));

    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <span key={i} className="fw-bold text-primary">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Navbar bg="primary"
      variant="dark"
      expand="lg"
      sticky="top"
      className="shadow py-3"
      style={{ minHeight: '75px', zIndex: 1030 }}>
      
      
      <Container>

        {/* BRAND */}
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          TechShop
        </Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>

          {/*  SEARCH */}
          <div
            className="position-relative mx-3 flex-grow-1"
            style={{ maxWidth: '420px', minWidth: '220px' }}
          >
            <InputGroup>
              <InputGroup.Text>
                <Search size={17} />
              </InputGroup.Text>

              <Form.Control
                placeholder="Search products"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(-1);
                }}
                onKeyDown={handleKeyDown}
              />

              {query && (
                <Button variant="light" onClick={clearSearch}>
                  <X size={18} />
                </Button>
              )}
            </InputGroup>

            {/* DROPDOWN */}
            {results.length > 0 && (
              <ListGroup
                className="position-absolute w-100 shadow"
                style={{ zIndex: 2000 }}
              >
                {results.map((product, index) => (
                  <ListGroup.Item
                    key={product.id}
                    action
                    active={index === activeIndex}
                    onMouseEnter={() => setActiveIndex(index)}
                    onClick={() => handleSelect(product)}
                  >
                    <div className="d-flex justify-content-between">
                      <span>
                        {highlightText(product.name, query)}
                      </span>
                      <small className="text-muted">
                        {product.category}
                      </small>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>

          {/* NAVIGATION */}
          <Nav className="ms-auto align-items-center">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>

            <Nav.Link as={Link} to="/cart" className="position-relative">
              <ShoppingCart size={20} />

              {totalItems > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.7rem' }}
                >
                  {totalItems}
                </Badge>
              )}
            </Nav.Link>
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}