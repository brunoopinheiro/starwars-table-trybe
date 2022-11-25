/* eslint-disable react/jsx-max-depth */
import { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import useFields from '../hooks/useFields';
import numericFilter from '../utils/numericFilter';
import usePlanetList from '../hooks/usePlanetList';

const columnFiltersArray = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];

export default function Table() {
  const { loading } = useContext(PlanetsContext);

  const [numFilters, setNumFilters] = useState([]);
  const [columnFilters, setColumnFilters] = useState(columnFiltersArray);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  const nameFilter = useFields('');
  const columnFilter = useFields(columnFiltersArray[0]);
  const compFilter = useFields('maior que');
  const valueFilter = useFields(0);

  const planetList = usePlanetList(nameFilter.value);

  const createNumFilter = () => {
    const newNumFilter = {
      compFilter: compFilter.value,
      columnFilter: columnFilter.value,
      valueFilter: valueFilter.value,
      id: columnFilter.value,
    };
    const remainingOptions = columnFilters
      .filter((cf) => cf !== newNumFilter.columnFilter);
    setNumFilters([...numFilters, newNumFilter]);
    setColumnFilters(remainingOptions);
  };

  const removeNumFilter = (id) => {
    const remainingFilters = numFilters.filter((nf) => nf.id !== id);

    setNumFilters(remainingFilters);
    setColumnFilters([...columnFilters, id]);
  };

  const resetFilters = () => {
    setNumFilters([]);
    setColumnFilters(columnFiltersArray);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const sortFunction = (a, b) => {
    const AUX = -1;
    const refColumn = order.column;
    if (a[refColumn] === 'unknown') return 1;
    if (b[refColumn] === 'unknown') return AUX;
    if (order.sort === 'ASC') {
      return a[refColumn] - b[refColumn];
    }
    return b[refColumn] - a[refColumn];
  };

  return (
    <div className="table-container">
      {
        loading
        && <h3 className="loading">Loading data from a galaxy far far away...</h3>
      }
      <div className="filters-buttons">
        <input
          data-testid="name-filter"
          type="text"
          placeholder="Planet Name"
          className="main-filter"
          value={ nameFilter.value }
          onChange={ nameFilter.handleChange }
        />
        <div className="numeric-filters">
          <select
            data-testid="column-filter"
            name="column-filter"
            value={ columnFilter.value }
            onChange={ columnFilter.handleChange }
            onClick={ columnFilter.handleChange }
          >
            {
              columnFilters.map((cf) => (
                <option key={ cf }>{cf}</option>
              ))
            }
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
            className="number-input"
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
          <span>Sort Results:</span>
          <select
            data-testid="column-sort"
            id="column-sort"
            name="column"
            value={ order.column }
            onChange={ handleChange }
          >
            {
              columnFiltersArray.map((cf) => (
                <option key={ cf } value={ cf }>{cf}</option>
              ))
            }
          </select>
          <div className="sort-filter">
            <label htmlFor="asc">
              <input
                data-testid="column-sort-input-asc"
                id="asc"
                value="ASC"
                type="radio"
                name="sort"
                checked={ order.sort === 'ASC' }
                onChange={ handleChange }
              />
              Ascending
            </label>
            <label htmlFor="desc">
              <input
                data-testid="column-sort-input-desc"
                id="desc"
                value="DESC"
                type="radio"
                name="sort"
                onChange={ handleChange }
              />
              Descending
            </label>
          </div>
          <button
            type="button"
            data-testid="button-remove-filters"
            onClick={ () => resetFilters() }
          >
            Remove All Filters
          </button>
        </div>

      </div>
      <div className="active-filters">
        {
          numFilters.map((nf) => (
            <span key={ nf.id } data-testid="filter" className="filter">
              {`${nf.columnFilter} ${nf.compFilter} ${nf.valueFilter}`}
              <button
                type="button"
                onClick={ () => removeNumFilter(nf.id) }
                data-testid="remove-filter-button"
              >
                X
              </button>
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
            }, planetList)
              .sort((a, b) => sortFunction(a, b))
              .map((p, index) => (
                <tr key={ `${index}_${p.name}` }>
                  <th data-testid="planet-name">{p.name}</th>
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
