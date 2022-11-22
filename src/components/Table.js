import useFetch from '../hooks/useFetch';

export default function Table() {
  const { planets, loading } = useFetch();

  return (
    <div className="table-container">
      { loading && <p>Loading data from a galaxy far far away...</p> }
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
            planets.map((p, index) => (
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
