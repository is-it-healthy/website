import { useState, useEffect } from "react";

/**
 * Custom hook to load JSON from a single URL.
 * @param {string} inputUrl - A single URL.
 * @returns {{ data: any, error: string | null, loading: boolean }}
 */
function useLoadJson(inputUrl) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!inputUrl) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(inputUrl);
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err.message || "Unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputUrl]);

  return { data, error, loading };
}

export default useLoadJson;
