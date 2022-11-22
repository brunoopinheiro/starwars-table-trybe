import { useMemo } from 'react';
import propTypes from 'prop-types';
import useFetch from '../hooks/useFetch';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const { loading, planets, setPlanets } = useFetch();

  const values = useMemo(() => ({
    loading, planets, setPlanets,
  }), [loading, planets, setPlanets]);

  return (
    <PlanetsContext.Provider value={ values }>
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: propTypes.shape().isRequired,
};

export default PlanetsProvider;
