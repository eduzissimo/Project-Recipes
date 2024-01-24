import { screen } from '@testing-library/react';
import Footer from '../Components/Footer';
import renderWithRouter from './helpers/renderWith';

describe('Testa o componente Footer.', () => {
//   const DRINKS_BOTTOM_BTN = 'drinks-bottom-btn';
//   const MEALS_BOTTOM_BTN = 'meals-bottom-btn';

  test('Testando o footer', () => {
    renderWithRouter(<Footer />);
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });
    const mealsBtn = screen.getByRole('button', { name: /meals/i });
    const drinkIcon = screen.getByRole('img', { name: /drinks/i });
    const mealIcon = screen.getByRole('img', { name: /meals/i });
    const navigation = screen.getByRole('navigation');

    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
    expect(navigation).toBeInTheDocument();
  });
});
