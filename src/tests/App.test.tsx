import { screen, waitFor } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import Login from '../Pages/Login';

test('Verifica os elementos da página de Login', async () => {
  const { user } = renderWithRouter(<Login />, { route: '/' });

  const emailInput = screen.getByTestId('email-input');
  const passwordInput = screen.getByTestId('password-input');
  const loginButton = screen.getByTestId('login-submit-btn');

  await user.type(emailInput, 'teste@teste.com');
  await user.type(passwordInput, '1234567');
  await user.click(loginButton);

  await waitFor(() => expect(window.location.pathname).toBe('/meals'));
});
