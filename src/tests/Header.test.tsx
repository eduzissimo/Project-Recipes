import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import Header from '../Components/Header';

describe('Testa o componente Header', () => {
  const PROFILE_BUTTON_TESTID = 'profile-top-btn';
  const PAGE_TITLE_TESTID = 'page-title';
  const SEARCH_TOP_BUTTON_TESTID = 'search-top-btn';

  test('Verifica se o componente /meals contém os data-testids', () => {
    renderWithRouter(<Header />, { route: '/meals' });
    const profileButton = screen.getByTestId(PROFILE_BUTTON_TESTID);
    const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);
    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON_TESTID);

    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();
  });

  test('Verifica se o componente /drinks contém os data-testids', () => {
    renderWithRouter(<Header />, { route: '/drinks' });

    const profileButton = screen.getByTestId(PROFILE_BUTTON_TESTID);
    const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);
    const searchTopButton = screen.getByTestId(SEARCH_TOP_BUTTON_TESTID);

    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
    expect(searchTopButton).toBeInTheDocument();
  });

  test('Verifica se o componente /done-recipes contém os data-testids', () => {
    renderWithRouter(<Header />, { route: '/done-recipes' });

    const profileButton = screen.getByTestId(PROFILE_BUTTON_TESTID);
    const pageTitle = screen.getByTestId(PAGE_TITLE_TESTID);

    expect(profileButton).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();
  });

  test('Verifica se ao clickar no botão de perfil, é redirecionado para a página /profile', async () => {
    const { user } = renderWithRouter(<Header />, { route: '/meals' });

    const profileButton = screen.getByTestId(PROFILE_BUTTON_TESTID);
    expect(profileButton).toBeInTheDocument();

    await user.click(profileButton);

    await waitFor(() => expect(window.location.pathname).toBe('/profile'));
  });
});
