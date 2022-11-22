import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import usePlanetList from '../hooks/usePlanetList';

export default function Table() {
  const [nameFilter, setNameFilter] = useState('');
  const planetList = usePlanetList(nameFilter);
  const { loading } = useFetch();

  return (
    <div className="table-container">
      { loading && <p>Loading data from a galaxy far far away...</p> }
      <input
        data-testid="name-filter"
        type="text"
        placeholder="Planet Name"
        value={ nameFilter }
        onChange={ (e) => setNameFilter(e.target.value) }
      />
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
            planetList.map((p, index) => (
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
