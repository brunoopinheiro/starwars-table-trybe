import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useFields from '../hooks/useFields';
import numericFilter from '../utils/numericFilter';
import usePlanetList from '../hooks/usePlanetList';

// This is a sample of the objects that need to be passed to the numFilter state.
// const sampleNumFilter = {
//   compFilter: compFilter.value,
//   columnFilter: columnFilter.value,
//   valueFilter: valueFilter.value,
//   id: numFilters.length,
// };

export default function Table() {
  const nameFilter = useFields('');
  const columnFilter = useFields('population');
  const compFilter = useFields('maior que');
  const valueFilter = useFields(0);

  const { loading } = useContext(PlanetsContext);

  const planetList = usePlanetList(nameFilter.value);

  const [numFilters, setNumFilters] = useState([]);

  const createNumFilter = () => {
    const newNumFilter = {
      compFilter: compFilter.value,
      columnFilter: columnFilter.value,
      valueFilter: valueFilter.value,
      id: numFilters.length,
    };
    setNumFilters([...numFilters, newNumFilter]);
  };

  return (
    <div className="table-container">
      { loading && <p>Loading data from a galaxy far far away...</p> }
      <div className="filters-buttons">
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Planet Name"
          value={ nameFilter.value }
          onChange={ nameFilter.handleChange }
        />
        <select
          data-testid="column-filter"
          name="column-filter"
          value={ columnFilter.value }
          onChange={ columnFilter.handleChange }
        >
          <option>population</option>
          <option>orbital_period</option>
          <option>diameter</option>
          <option>rotation_period</option>
          <option>surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          name="comparison-filter"
          value={ compFilter.value }
          onChange={ compFilter.handleChange }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
        <input
          data-testid="value-filter"
          type="number"
          value={ valueFilter.value }
          onChange={ valueFilter.handleChange }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => createNumFilter() }
        >
          Filter
        </button>
      </div>
      <div className="active-filters">
        {
          numFilters.map((nf) => (
            <span key={ nf.id }>
              {`${nf.columnFilter} ${nf.compFilter} ${nf.valueFilter}`}
              <button type="button" onClick={ () => console.log(nf.id) }>X</button>
            </span>
          ))
        }
      </div>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {
            numFilters.reduce((acc, currNF) => {
              const filtered = numericFilter(currNF, acc);
              return filtered;
            }, planetList).map((p, index) => (
              <tr key={ `${index}_${p.name}` }>
                <th>{p.name}</th>
                <th>{p.rotation_period}</th>
                <th>{p.orbital_period}</th>
                <th>{p.diameter}</th>
                <th>{p.climate}</th>
                <th>{p.gravity}</th>
                <th>{p.terrain}</th>
                <th>{p.surface_water}</th>
                <th>{p.population}</th>
                <th>
                  <ul>
                    {
                      p.films.map((film) => <li key={ film }>{film}</li>)
                    }
                  </ul>
                </th>
                <th>{p.created}</th>
                <th>{p.edited}</th>
                <th>{p.url}</th>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}
