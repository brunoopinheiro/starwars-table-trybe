import { render } from '@testing-library/react';
import PlanetsProvider from '../context/PlanetsProvider';

export default function renderWithContext(component) {
  return {
    ...render(<PlanetsProvider>{component}</PlanetsProvider>),
  };
}
