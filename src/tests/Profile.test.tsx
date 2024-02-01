import { screen } from '@testing-library/dom';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

describe('Testa o componente Profile', () => {
  it('Verifica se o componente contém os data-testids', () => {
    renderWithRouter(<App />, { route: '/profile' });

    const profileEmail = screen.getByTestId('profile-email');
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');

    expect(profileEmail).toBeInTheDocument();
    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });

  it('Verifica se ao clickar no botão de done recipes, é redirecionado para a página /done-recipes', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    expect(profileDoneBtn).toBeInTheDocument();

    await user.click(profileDoneBtn);

    expect(window.location.pathname).toBe('/done-recipes');
  });

  it('Verifica se ao clickar no botão de favorite recipes, é redirecionado para a página /favorite-recipes', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    expect(profileFavoriteBtn).toBeInTheDocument();

    await user.click(profileFavoriteBtn);

    expect(window.location.pathname).toBe('/favorite-recipes');
  });

  it('Verifica se ao clickar no botão de logout, é redirecionado para a página /', async () => {
    const { user } = renderWithRouter(<App />, { route: '/profile' });

    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    expect(profileLogoutBtn).toBeInTheDocument();

    await user.click(profileLogoutBtn);

    expect(window.location.pathname).toBe('/');
  });

  it('Verifica se o e-mail salvo no LocalStorage é renderizado', () => {
    const user = { email: 'email@mail.com' };
    localStorage.setItem('user', JSON.stringify(user));

    renderWithRouter(<App />, { route: '/profile' });
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toHaveTextContent('email@mail.com');
  });
});
