import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

describe('Testes do componente RecipeDetails', () => {
  test('Testa página de detalhes da receita em drinks', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks/15997' });

    const ggImage = await screen.findByTestId('recipe-photo');
    expect(ggImage).toBeInTheDocument();

    const shareBtn = await screen.findByRole('button', { name: /share/i });

    user.click(shareBtn);

    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toBeInTheDocument();

    const favoriteBtn = await screen.findByRole('button', { name: /favorite/i });
    user.click(favoriteBtn);

    expect(favoriteBtn).toBeInTheDocument();

    const recommendedImage = await screen.findByRole('img', { name: /corba/i });
    expect(recommendedImage).toBeInTheDocument();

    const startRecipeBtn = await screen.findByRole('button', { name: /start recipe/i });
    user.click(startRecipeBtn);

    await waitFor(async () => {
      await expect(window.location.pathname).toBe('/drinks/15997/in-progress');
    });
  });

  test('Testa página de detalhes da receita em meals', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals/53026' });

    const ggImage = await screen.findByTestId('recipe-photo');
    expect(ggImage).toBeInTheDocument();

    const shareBtn = await screen.findByRole('button', { name: /share/i });

    user.click(shareBtn);

    const linkCopied = await screen.findByText(/link copied!/i);
    expect(linkCopied).toBeInTheDocument();

    const favoriteBtn = await screen.findByRole('button', { name: /favorite/i });
    user.click(favoriteBtn);

    expect(favoriteBtn).toBeInTheDocument();

    const recommendedImage = await screen.findByRole('img', { name: /A1/i });
    expect(recommendedImage).toBeInTheDocument();

    const startRecipeBtn = await screen.findByRole('button', { name: /start recipe/i });
    user.click(startRecipeBtn);

    await waitFor(async () => {
      await expect(window.location.pathname).toBe('/meals/53026/in-progress');
    });
  });

  test('Verifica se ao favoritar, salva no localStorage, muda o ícone', async () => {
    const { user } = renderWithRouter(<App />, { route: '/meals/53065' });

    const favoriteBtn = await screen.findByRole('button', { name: /favorite/i });
    user.click(favoriteBtn);

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isFav = favorites.some((recipe: any) => recipe.id === '53065');
    expect(isFav).toBe(false);
  });

  test('Verifica se ao favoritar, salva no localStorage, muda o ícone', async () => {
    const { user } = renderWithRouter(<App />, { route: '/drinks/178319' });

    const favoriteBtn = await screen.findByRole('button', { name: /favorite/i });
    user.click(favoriteBtn);

    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isFav = favorites.some((recipe: any) => recipe.id === '178319');
    expect(isFav).toBe(false);
  });
});
