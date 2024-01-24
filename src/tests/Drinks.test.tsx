import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import Recipes from '../Components/Recipes';

describe('Testa a página /drinks', () => {
  test('Verifica se a página /drinks renderiza os 12 cards corretamente', async () => {
    renderWithRouter(<Recipes />, { route: '/drinks' });

    await waitFor(async () => {
      for (let index = 0; index < 12; index++) {
        const recipeCard = screen.getByTestId(`${index}-recipe-card`);
        const recipeImg = screen.getByTestId(`${index}-card-img`);
        const recipeName = screen.getByTestId(`${index}-card-name`);

        expect(recipeCard).toBeInTheDocument();
        expect(recipeImg).toBeInTheDocument();
        expect(recipeName).toBeInTheDocument();
      }
    }, { timeout: 10000 });
  });
});
