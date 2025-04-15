import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch JSON data from a given URL.
 * @param {string} url - The URL to fetch JSON from.
 * @returns {{ data: any, error: string | null, loading: boolean }}
 */
function useLoadJson(url) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!url) return;

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        if (signal.aborted) {
          console.log(`Fetch aborted for URL: ${url}`);
        } else {
          console.error('Fetch error:', err);
          setError(err?.message || 'Unknown error occurred');
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    // Cleanup: abort fetch if component unmounts or URL changes
    return () => controller.abort();

  }, [url]);

  return { data, error, loading };
}

export default useLoadJson;
