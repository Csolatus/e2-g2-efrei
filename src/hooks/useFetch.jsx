import { useState, useEffect } from 'react';

/**
 * Charge une ressource JSON et expose son état de chargement.
 * La requête est annulée au démontage ou au changement d'URL, ce qui évite
 * qu'une réponse obsolète écrase l'état courant.
 * @param {string} url - URL de l'API à appeler.
 * @returns {{data: any, isLoading: boolean, error: string|null}}
 */
function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`Erreur HTTP ${response.status}`);
        }
        setData(await response.json());
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
    return () => controller.abort();
  }, [url]);

  return { data, isLoading, error };
}

export default useFetch;
