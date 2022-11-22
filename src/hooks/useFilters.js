// import { useEffect } from 'react';

import { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';

const MAIOR = 'maior que';
const MENOR = 'menor que';
const IGUAL = 'igual a';

export default function useFilters(
  compFilter,
  columnFilter,
  valueFilter,
  planetList,
) {
  const { setPlanets } = useContext(PlanetsContext);

  function numericFilter() {
    switch (compFilter) {
    case MAIOR: {
      const filteredPlanets = planetList.filter((p) => p[columnFilter] > valueFilter);
      setPlanets(filteredPlanets);
      break;
    }

    case MENOR: {
      const filteredPlanets = planetList.filter((p) => p[columnFilter] < valueFilter);
      console.log(filteredPlanets);
      setPlanets(filteredPlanets);
      break;
    }

    case IGUAL: {
      const filteredPlanets = planetList.filter((p) => p[columnFilter] === valueFilter);
      setPlanets(filteredPlanets);
      break;
    }

    default:
      break;
    }
  }

  return numericFilter;
}
