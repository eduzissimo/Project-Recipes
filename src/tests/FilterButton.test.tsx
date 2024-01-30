// import { screen } from '@testing-library/dom';
// import renderWithRouter from './helpers/renderWith';
// import FilterRecipes from '../Components/FilterRecipes';

// describe('Testa componente FilterRecipes', () => {
//   test('Verifica se as 5 categorias estão presentes na tela meals', () => {
//     renderWithRouter(<FilterRecipes />, { route: '/meals' });

//     screen.getByText('Loading...');

//     screen.findAllByRole('button').then((buttons) => {
//       expect(buttons).toHaveLength(5);
//       expect(buttons[0]).toHaveTextContent('Beef');
//       expect(buttons[1]).toHaveTextContent('Breakfast');
//       expect(buttons[2]).toHaveTextContent('Chicken');
//       expect(buttons[3]).toHaveTextContent('Dessert');
//       expect(buttons[4]).toHaveTextContent('Goat');
//     });
//   });

//   test('Verifica se as 5 categorias estão presentes na tela dinks', () => {
//     renderWithRouter(<FilterRecipes />, { route: '/dinks' });

//     screen.getByText('Loading...');

//     screen.findAllByRole('button').then((buttons) => {
//       expect(buttons).toHaveLength(5);
//       expect(buttons[0]).toHaveTextContent('Ordinary Drink');
//       expect(buttons[1]).toHaveTextContent('Cocktail');
//       expect(buttons[2]).toHaveTextContent('Shake');
//       expect(buttons[3]).toHaveTextContent('Other / Unknown');
//       expect(buttons[4]).toHaveTextContent('Cocoa');
//     });
//   });
// });
