import React from 'react';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import renderWithContext from './renderWithContext';
import App from '../App';
import mockData from './mockData';

const API_URL = 'https://swapi.dev/api/planets';

describe('Tests the display of components in the application', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should test if the correct components are displayed', () => {
    renderWithContext(<App />);

    expect(screen.getByRole('heading')).toHaveTextContent('Projeto Star Wars - Trybe');

    expect(screen.getByTestId('name-filter')).toBeInTheDocument();
    expect(screen.getByTestId('column-filter')).toBeInTheDocument();
    expect(screen.getByTestId('comparison-filter')).toBeInTheDocument();
    expect(screen.getByTestId('value-filter')).toBeInTheDocument();
    expect(screen.getByTestId('button-filter')).toBeInTheDocument();

    expect(screen.getByTestId('column-sort')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-asc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-input-desc')).toBeInTheDocument();
    expect(screen.getByTestId('column-sort-button')).toBeInTheDocument();

    expect(screen.getByTestId('button-remove-filters')).toBeInTheDocument();

    const expectedHeadings = [
      'Name',
      'Rotation Period',
      'Orbital Period',
      'Diameter',
      'Climate',
      'Gravity',
      'Terrain',
      'Surface Water',
      'Population',
      'Films',
      'Created',
      'Edited',
      'URL',
    ];
    const tableHeadings = screen.getAllByRole('columnheader');
    expect(tableHeadings).toHaveLength(expectedHeadings.length);
    tableHeadings.forEach((tr, index) => {
      expect(tr).toHaveTextContent(expectedHeadings[index]);
    });
  });

  it('should test if the correct endpoint was fetched', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithContext(<App />);

    expect(fetch).toHaveBeenCalledWith(API_URL);
  });

  it('should test if the correct results are displayed', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithContext(<App />);

    await waitFor(() => {
      const tableNames = screen.getAllByTestId('planet-name');
      expect(tableNames).toHaveLength(mockData.results.length);
    });
  });
});

describe('Tests the application filters', () => {
  it.todo('should test if the name filter works correctly');
  it.todo('should test if multiple numeric filters can be added');
  it.todo('should test if the sorting filters works correctly');
});
