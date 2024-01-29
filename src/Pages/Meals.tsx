import { useState } from 'react';
import FilterRecipes from '../Components/FilterRecipes';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';

function Meals() {
  const [recipes, setRecipes] = useState([]);
  // recipes está sendo o array atualizado caso o usuario selecione um filtro
  // setRecipes para atualizar renerização do componente recipes

  return (
    <div data-testid="page-title">
      <Header />
      <FilterRecipes setRecipes={ setRecipes } />
      <Recipes recipes={ recipes } />
    </div>
  );
}

export default Meals;
