import { useMemo, useState, useEffect } from 'react';
import { products } from '../data/products';

export function useSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(-1);

  //  debounce effect (300ms)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    if (!debouncedQuery.trim()) return [];

    return products
      .filter((p) => {
        const q = debouncedQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        );
      })
      .slice(0, 6);
  }, [debouncedQuery]);

  const clearSearch = () => {
    setQuery('');
    setActiveIndex(-1);
  };

  return {
    query,
    setQuery,
    results,
    clearSearch,
    activeIndex,
    setActiveIndex,
  };
}