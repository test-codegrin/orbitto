import { useEffect, useState } from "react";

const useCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadCategories = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/categories", {
          signal: controller.signal,
        });
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result?.message || "Unable to load categories.");
        }

        setCategories(result.categories || []);
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

    loadCategories();

    return () => controller.abort();
  }, []);

  return { categories, isLoading, error };
};

export default useCategories;
