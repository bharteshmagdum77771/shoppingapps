import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { Home } from 'lucide-react';

export function NotFound() {
  return (
    <Container
      as="main"
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: '70vh' }}
    >
      <h1 className="display-1 fw-bold text-primary">
        404
      </h1>

      <h2 className="mb-3">Page Not Found</h2>

      <p className="text-muted mb-4">
        The page you're looking for doesn't exist or has been moved.
      </p>

      <Button
        as={Link}
        to="/"
        variant="primary"
        size="lg"
        className="d-inline-flex align-items-center gap-2"
      >
        <Home size={20} />
        Back to Home
      </Button>
    </Container>
  );
}