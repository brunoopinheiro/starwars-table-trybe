import API_URL from '../constants';

export default async function fetchData() {
  const result = await fetch(API_URL);
  const data = await result.json();
  const planets = data.results.map((p) => {
    delete p.residents;
    return p;
  });

  return planets;
}
