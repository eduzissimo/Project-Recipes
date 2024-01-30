import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import { mealsData } from './helpers/mocks/dataMeals';
import App from '../App';

describe('Testando a página de RecipesInProgress', () => {
  beforeEach(() => {
    vi.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mealsData),
    } as any);
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });
  afterAll(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('Testa se a página contém os elementos corretos', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    const pageTitles = await screen.findAllByTestId('page-title');
    const recipeCards = await screen.findAllByTestId(/recipe-card/i);
    const mealsButton = await screen.findByTestId('meals-bottom-btn');
    const drinksButton = await screen.findByTestId('drinks-bottom-btn');

    expect(pageTitles).toHaveLength(2);
    expect(recipeCards).toHaveLength(12);
    expect(mealsButton).toBeInTheDocument();
    expect(drinksButton).toBeInTheDocument();
  });

  it('Testa se os cards de receitas possuem os elementos corretos', async () => {
    renderWithRouter(<App />, { route: '/meals' });

    const recipeCards = await screen.findAllByTestId(/recipe-card/i);

    recipeCards.forEach((card) => {
      const cardImage = card.querySelector('img');
      const cardTitle = card.querySelector('h3');

      expect(cardImage).toBeInTheDocument();
      expect(cardTitle).toBeInTheDocument();
    });
  });
});
