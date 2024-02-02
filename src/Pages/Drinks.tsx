import { useState } from 'react';
import FilterRecipes from '../Components/FilterRecipes';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';

function Drinks() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div data-testid="page-title">
      <Header />
      <FilterRecipes setRecipes={ setRecipes } />
      <Recipes recipes={ recipes } />
    </div>
  );
}

export default Drinks;
