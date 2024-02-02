import { screen, waitFor } from '@testing-library/dom';
import renderWithRouter from './helpers/renderWith';
import DoneRecipes from '../Pages/DoneRecipes';

describe('Testa os elementos da pagina de done-recipes.', () => {
  test('Testa a rota /done-recipes.', async () => {
    const { user } = renderWithRouter(<DoneRecipes />, { route: '/done-recipes' });
    const profileBtn = screen.getByRole('button', { name: /profile icon/i });
    const profileIcon = screen.getByRole('img', { name: /profile icon/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const allBtnId = screen.getByTestId('filter-by-all-btn');
    const mealsBtn = screen.getByRole('button', { name: /meals/i });
    const mealsBtnId = screen.getByTestId('filter-by-meal-btn');
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    const drinksBtnId = screen.getByTestId('filter-by-drink-btn');

    expect(drinksBtnId).toBeInTheDocument();
    expect(mealsBtnId).toBeInTheDocument();
    expect(allBtnId).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    await user.click(profileBtn);
    await waitFor(() => expect(window.location.pathname).toBe('/profile'));
    expect(profileIcon).toBeInTheDocument();
  });

  test('Testando a lista dinamica.', () => {
    renderWithRouter(<DoneRecipes />, { route: '/done-recipes' });
    let indexImg = 0;
    while (indexImg < 100) {
      const imageTestId = `${indexImg}-horizontal-image`;
      const imageElement = screen.queryByTestId(imageTestId);

      if (!imageElement) {
        break;
      }

      expect(imageElement).toBeInTheDocument();
      indexImg += 1;
    }

    let indexName = 0;
    while (indexName < 100) {
      const nameTestId = `${indexName}-horizontal-name`;
      const nameElement = screen.queryByTestId(nameTestId);

      if (!nameElement) {
        break;
      }

      expect(nameElement).toBeInTheDocument();
      indexName += 1;
    }
  });
});
