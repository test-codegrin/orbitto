import { useEffect, useState } from "react";

const buildProductsUrl = ({ category, search, page, limit } = {}) => {
  const params = new URLSearchParams();

  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  const queryString = params.toString();
  return queryString ? `/api/products?${queryString}` : "/api/products";
};

const useProducts = (filters = {}) => {
  const { category, search, page = 1, limit = 100 } = filters;
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          buildProductsUrl({ category, search, page, limit }),
          { signal: controller.signal }
        );
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Unable to load products.");
        }

        setProducts(result.products || []);
        setPagination(result.pagination || null);
      } catch (requestError) {
        if (requestError.name !== "AbortError") {
          setError(requestError.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    loadProducts();

    return () => controller.abort();
  }, [category, search, page, limit]);

  return { products, pagination, isLoading, error };
};

export default useProducts;
