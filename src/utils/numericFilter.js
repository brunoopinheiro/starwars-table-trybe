const MAIOR = 'maior que';
const MENOR = 'menor que';
const IGUAL = 'igual a';

export default function numericFilter(
  {
    compFilter,
    columnFilter,
    valueFilter,
  },
  planetList,
) {
  switch (compFilter) {
  case MAIOR: {
    const filteredPlanets = planetList.filter((p) => p[columnFilter] > valueFilter);
    return filteredPlanets;
  }

  case MENOR: {
    const filteredPlanets = planetList.filter((p) => p[columnFilter] < valueFilter);
    return filteredPlanets;
  }

  case IGUAL: {
    const filteredPlanets = planetList.filter((p) => p[columnFilter] === valueFilter);
    return filteredPlanets;
  }

  default:
    return planetList;
  }
}
