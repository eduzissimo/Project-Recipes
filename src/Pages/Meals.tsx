import { useState } from 'react';
import FilterRecipes from '../Components/FilterRecipes';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';

function Meals() {
  const [recipes, setRecipes] = useState([]);

  return (
    <div data-testid="page-title">
      <Header setRecipes={ setRecipes } />
      <FilterRecipes setRecipes={ setRecipes } />
      <Recipes recipes={ recipes } />
    </div>
  );
}

export default Meals;
