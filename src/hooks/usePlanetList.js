import { useState, useEffect } from 'react';
import useFetch from './useFetch';

function usePlanetList(planetName) {
  const { planets } = useFetch();
  const [planetList, setPlanetList] = useState(planets);

  useEffect(() => {
    const filteredPlanets = planets.filter((p) => p.name.includes(planetName));
    setPlanetList(filteredPlanets);
  }, [planetName, planets]);

  return planetList;
}

export default usePlanetList;
