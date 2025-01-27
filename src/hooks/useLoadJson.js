import { useState, useEffect } from "react";

/**
 * Custom hook to load JSON from a single URL or a list of URLs.
 * @param {string | string[]} inputUrls - A single URL or an array of URLs.
 * @returns {{ data: any, error: any, loading: boolean }}
 */
function useLoadJson(inputUrls) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!inputUrls) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        if (Array.isArray(inputUrls)) {
          // If inputUrls is an array, fetch all URLs concurrently
          const responses = await Promise.all(
            inputUrls.map(async (item) => {
              try {
                const res = await fetch(item.url);
                if (!res.ok) {
                  throw new Error(`Error fetching ${res.url}: ${res.statusText}`);
                }
                return await res.json();
              } catch (err) {
                return { error: err.message };
              }
            })
          );
          setData(responses);
        } else {
          // If inputUrls is a single URL, fetch it
          const response = await fetch(inputUrls);
          if (!response.ok) {
            throw new Error(`Error fetching ${response.url}: ${response.statusText}`);
          }
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputUrls]);

  return { data, error, loading };
}

export default useLoadJson;
