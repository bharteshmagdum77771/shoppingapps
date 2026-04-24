import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Button } from 'react-bootstrap';
import { ArrowUp } from 'lucide-react';

export function Root() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Show button after scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 250) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <main className="flex-grow-1">
        <Outlet />
      </main>

      <footer className="bg-dark text-white py-4 mt-5">
        <div className="container text-center">
          <p className="mb-0">© 2026 TechShop. All rights reserved.</p>
        </div>
      </footer>

      {/* BACK TO TOP BUTTON */}
      {showTopBtn && (
        <Button
          onClick={scrollToTop}
          variant="primary"
          className="position-fixed d-flex align-items-center justify-content-center"
          style={{
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            zIndex: 9999,
          }}
        >
          <ArrowUp size={20} />
        </Button>
      )}
    </div>
  );
}