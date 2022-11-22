import { useState, useEffect, useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function usePlanetList(planetName) {
  const { planets } = useContext(PlanetsContext);
  const [planetList, setPlanetList] = useState(planets);

  useEffect(() => {
    const filteredPlanets = planets.filter((p) => p.name.includes(planetName));
    setPlanetList(filteredPlanets);
  }, [planetName, planets]);

  return planetList;
}

export default usePlanetList;
