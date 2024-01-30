import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { RecipesDetails } from '../Components/RecipesDetails'; // Supondo que o arquivo seja chamado 'RecipesDetails.tsx'

describe('Testes para o Details Recipes', () => {
  test('Testa se renderiza de loading enquanto a página está carregando', () => {
    render(
      <BrowserRouter>
        <RecipesDetails />
      </BrowserRouter>,
    );
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });
});
