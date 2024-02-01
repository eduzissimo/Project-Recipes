import { act, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import chickenMeals from './helpers/mocks/chickenMeals';
import { mealsCategory } from './helpers/mocks/dataMeals';

describe('Testa o componente Header', () => {
  const PROFILE_BUTTON_TESTID = 'profile-top-btn';
  const PAGE_TITLE_TESTID = 'page-title';
  const SEARCH_TOP_BUTTON_TESTID = 'search-top-btn';
  const CHICKEN_MEALS = { json: async () => chickenMeals } as Response;
  const MEALS_CATEGORY = { json: async () => mealsCategory } as Response;

  beforeEach(() => {
    vi.spyOn(global, 'fetch')
      .mockResolvedValueOnce(CHICKEN_MEALS)
      .mockResolvedValueOnce(MEALS_CATEGORY);
  });
  test('Verifica se o botão de profile leva pra rota certa', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: '/meals' });
    });

    const profileBtn = await screen.findByTestId(PROFILE_BUTTON_TESTID);

    await userEvent.click(profileBtn);
    await waitFor(() => expect(window.location.pathname).toBe('/profile'));
  });

  test('Verifica se o botão de search desaparece na rota /profile', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: '/meals' });
    });

    const profileBtn = await screen.findByTestId(PROFILE_BUTTON_TESTID);
    const searchBtn = await screen.findByTestId(SEARCH_TOP_BUTTON_TESTID);

    await userEvent.click(profileBtn);
    await waitFor(() => expect(searchBtn).not.toBeInTheDocument());
  });

  test('Verifica se na rota /meals o texto Meals aparece no header além do ícon de busca e perfil', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: '/meals' });
    });

    const pageTitles = screen.getAllByTestId(PAGE_TITLE_TESTID);
    const searchBtn = screen.getByTestId(SEARCH_TOP_BUTTON_TESTID);
    const profileBtn = screen.getByTestId(PROFILE_BUTTON_TESTID);

    expect(pageTitles[0]).toHaveTextContent('Meals');
    expect(searchBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
  });

  test('Verifica se na rota /favorite-recipes o texto Favorite Recipes aparece no header além do ícon de perfil', async () => {
    await act(async () => {
      renderWithRouter(<App />, { route: '/favorite-recipes' });
    });

    const profileBtn = await screen.findByTestId(PROFILE_BUTTON_TESTID);
    const pageTitle = await screen.findByTestId(PAGE_TITLE_TESTID);

    expect(pageTitle).toHaveTextContent('Favorite Recipes');
    expect(profileBtn).toBeInTheDocument();
  });
});
