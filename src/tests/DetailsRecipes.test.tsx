import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { RecipesDetails } from '../Components/RecipesDetails'; // Supondo que o arquivo seja chamado 'RecipesDetails.tsx'

describe('RecipesDetails component', () => {
  test('renders loading message when recipe details are not loaded', () => {
    render(
      <BrowserRouter>
        <RecipesDetails />
      </BrowserRouter>,
    );
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });
});
