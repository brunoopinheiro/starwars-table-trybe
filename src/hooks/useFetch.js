import { useState, useEffect } from 'react';
import fetchData from '../utils/fetchData';

function useFetch() {
  const [loading, setLoading] = useState(true);
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getPlanets() {
      try {
        const planetsData = await fetchData();
        setPlanets(planetsData);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    }

    getPlanets();
  }, []);

  return { loading, planets, error };
}

export default useFetch;
