import React from 'react';
import { screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithContext from './renderWithContext';
import App from '../App';
import mockData from './mockData';

const API_URL = 'https://swapi.dev/api/planets';
const nameFilterTestId = 'name-filter';
const columnFilterTestId = 'column-filter';
const comparisonFilterTestId = 'comparison-filter';
const valueFilterTestId = 'value-filter';
const buttonFilterTestId = 'button-filter';
const planetNameTestId = 'planet-name';
const colSortTestId = 'column-sort';
const colSortAscTestId = 'column-sort-input-asc';
const colSortDescTestId = 'column-sort-input-desc';
const sortButtonTestId = 'column-sort-button';
const buttonRemoveFiltersTestId = 'button-remove-filters';

describe('Tests the display of components in the application', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should test if the correct components are displayed', () => {
    renderWithContext(<App />);

    // Header was replaced to logo image.
    // expect(screen.getByRole('heading')).toHaveTextContent('Projeto Star Wars - Trybe');

    expect(screen.getByTestId(nameFilterTestId)).toBeInTheDocument();
    expect(screen.getByTestId(columnFilterTestId)).toBeInTheDocument();
    expect(screen.getByTestId(comparisonFilterTestId)).toBeInTheDocument();
    expect(screen.getByTestId(valueFilterTestId)).toBeInTheDocument();
    expect(screen.getByTestId(buttonFilterTestId)).toBeInTheDocument();

    expect(screen.getByTestId(colSortTestId)).toBeInTheDocument();
    expect(screen.getByTestId(colSortAscTestId)).toBeInTheDocument();
    expect(screen.getByTestId(colSortDescTestId)).toBeInTheDocument();
    expect(screen.getByTestId(sortButtonTestId)).toBeInTheDocument();

    expect(screen.getByTestId(buttonRemoveFiltersTestId)).toBeInTheDocument();

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
      const tableNames = screen.getAllByTestId(planetNameTestId);
      expect(tableNames).toHaveLength(mockData.results.length);
    });
  });
});

describe('Tests the application filters', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  it('should test if the name filter works correctly', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithContext(<App />);
    
    const nameFilter = screen.getByTestId(nameFilterTestId);
    act(() => userEvent.type(nameFilter, 'oo'));

    let tableNames = [];
    await waitFor(() => {
      tableNames = screen.getAllByTestId(planetNameTestId);
    });

    expect(tableNames).toHaveLength(2);
  });

  it('should test if a numeric filter can be added', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithContext(<App />);

    const colFilter = screen.getByTestId(columnFilterTestId);
    const compFilter = screen.getByTestId(comparisonFilterTestId);
    const valueFilter = screen.getByTestId(valueFilterTestId);
    const filButton = screen.getByTestId(buttonFilterTestId);

    act(() => {
      userEvent.selectOptions(colFilter, 'rotation_period');
      userEvent.selectOptions(compFilter, 'igual a');
      userEvent.clear(valueFilter);
      userEvent.type(valueFilter, '12')
      userEvent.click(filButton);
    });

    let tableNames = [];
    await waitFor(() => {
      tableNames = screen.getAllByTestId(planetNameTestId);
    });

    expect(tableNames).toHaveLength(1);
    expect(tableNames[0]).toHaveTextContent('Bespin');
  });

  it('should test if multiple numeric filters can be added', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithContext(<App />);

    const colFilter = screen.getByTestId(columnFilterTestId);
    const compFilter = screen.getByTestId(comparisonFilterTestId);
    const valueFilter = screen.getByTestId(valueFilterTestId);
    const filButton = screen.getByTestId(buttonFilterTestId);

    act(() => {
      userEvent.selectOptions(colFilter, 'diameter');
      userEvent.selectOptions(compFilter, 'maior que');
      userEvent.clear(valueFilter);
      userEvent.type(valueFilter, '8900');
      userEvent.click(filButton);

      userEvent.selectOptions(colFilter, 'orbital_period');
      userEvent.selectOptions(compFilter, 'menor que');
      userEvent.clear(valueFilter);
      userEvent.type(valueFilter, '500');
      userEvent.click(filButton);
    });

    const filters = screen.getAllByTestId('filter');
    expect(filters).toHaveLength(2);
    
    let tableNames = [];
    await waitFor(() => {
      tableNames = screen.getAllByTestId(planetNameTestId);
    });

    expect(tableNames).toHaveLength(5);

    const deleteFilterButtons = screen.getAllByTestId('remove-filter-button');
    act(() => {
      userEvent.click(deleteFilterButtons[0]);
    });
    expect(filters[0]).not.toBeInTheDocument();
    expect(filters[1]).toBeInTheDocument();

    act(() => userEvent.click(screen.getByTestId(buttonRemoveFiltersTestId)));
    expect(filters[1]).not.toBeInTheDocument();
  });

  it('should test if the sorting filters works correctly', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithContext(<App />);

    const colSortFilter = screen.getByTestId(colSortTestId);
    const colSortOrderFilter = screen.getByTestId(colSortDescTestId);

    act(() => {
      userEvent.selectOptions(colSortFilter, 'surface_water');
      userEvent.click(colSortOrderFilter);
    });

    let tableNames = [];
    await waitFor(() => {
      tableNames = screen.getAllByTestId(planetNameTestId);
    });

    expect(tableNames[2]).toHaveTextContent('Alderaan');
    expect(tableNames[9]).toHaveTextContent('Coruscant');
  });
});
