import { act, screen } from '@testing-library/react';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './helpers/renderWith';
import mealsByIngredient from './helpers/mocks/mealsByIngredient';
import mealsByName from './helpers/mocks/mealsByName';
import {
  drinksByFirstLetter,
  drinksByIngredient,
} from './helpers/mocks/dataDrinks';

const searchIconTestId = 'search-top-btn';
const searchInputBtnTestId = 'exec-search-btn';
const searchInputTestId = 'search-input';
const ingredientBtnTestId = 'ingredient-search-radio';
const nameBtnTestId = 'name-search-radio';
const firstLetterBtnTestId = 'first-letter-search-radio';

describe('Testes do componente SearchBar', () => {
  test('Verifica busca por ingrediente em meals', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mealsByIngredient,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    await act(async () => {
      renderWithRouter(<App />, { route: '/meals' });
    });

    const searchIconBtn = await screen.findByTestId(searchIconTestId);
    await userEvent.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await userEvent.type(searchInput, 'chicken');
    await userEvent.click(ingredientRadioBtn);
    await userEvent.click(searchBTn);

    const chickenMeals = await screen.findAllByTestId(/card-name/i);
    expect(chickenMeals).toHaveLength(11);
  });

  test('Verifica busca por ingrediente em drinks', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => drinksByIngredient,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    await act(async () => {
      renderWithRouter(<App />, { route: '/drinks' });
    });

    const searchIconBtn = await screen.findByTestId(searchIconTestId);
    await userEvent.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const ingredientRadioBtn = await screen.findByTestId(ingredientBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await userEvent.type(searchInput, 'orange');
    await userEvent.click(ingredientRadioBtn);
    await userEvent.click(searchBTn);

    const orangeDrinks = await screen.findAllByTestId(/card-name/i);
    expect(orangeDrinks).toHaveLength(4);
  });

  test('Verifica busca por nome em meals', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => mealsByName,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    await act(async () => {
      renderWithRouter(<App />, { route: '/meals' });
    });

    const searchIconBtn = await screen.findByTestId(searchIconTestId);
    await userEvent.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await userEvent.type(searchInput, 'Tamiya');
    await userEvent.click(nameRadioBtn);
    await userEvent.click(searchBTn);

    const tamiyaMeal = await screen.findByTestId(/recipe-photo/i);
    expect(tamiyaMeal).toBeInTheDocument();
    expect(window.location.pathname).toBe('/meals/53026');
  });

  test('Verifica busca por letra em drinks', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => drinksByFirstLetter,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    await act(async () => {
      renderWithRouter(<App />, { route: '/drinks' });
    });

    const searchIconBtn = await screen.findByTestId(searchIconTestId);
    await userEvent.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const nameRadioBtn = await screen.findByTestId(firstLetterBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await userEvent.type(searchInput, 'b');
    await userEvent.click(nameRadioBtn);
    await userEvent.click(searchBTn);

    const b52Drink = await screen.findByText(/b-52/i);
    expect(b52Drink).toBeInTheDocument();
  });

  test('Verifica  busca por nome em drinks', async () => {
    const MOCK_RESPONSE = {
      ok: true,
      status: 200,
      json: async () => drinksByFirstLetter,
    } as Response;

    vi.spyOn(global, 'fetch').mockResolvedValueOnce(MOCK_RESPONSE);

    await act(async () => {
      renderWithRouter(<App />, { route: '/drinks' });
    });

    const searchIconBtn = await screen.findByTestId(searchIconTestId);
    await userEvent.click(searchIconBtn);

    const searchInput = await screen.findByTestId(searchInputTestId);
    const nameRadioBtn = await screen.findByTestId(nameBtnTestId);
    const searchBTn = await screen.findByTestId(searchInputBtnTestId);

    await userEvent.type(searchInput, 'b-52');
    await userEvent.click(nameRadioBtn);
    await userEvent.click(searchBTn);

    const b52Drink = await screen.findByText(/b-52/i);
    expect(b52Drink).toBeInTheDocument();
  });
});
