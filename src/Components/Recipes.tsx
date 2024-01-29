import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import Fetcher from '../utils/fetcher';

function Recipes({ recipes }:any) {
  const { data: search, loading, error } = Fetcher('search');
  const recipesData = recipes && recipes.length > 0 ? recipes : search;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const handleCardClick = (recipeId: string, isMealsPg: boolean) => {
    const route = isMealsPg ? `/meals/${recipeId}` : `/drinks/${recipeId}`;
    navigate(route);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <div>
        {recipesData?.slice(0, 12).map((recipe: any, index: any) => (
          <button
            key={ recipe.idMeal || recipe.idDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => handleCardClick(isMealsPage
              ? recipe.idMeal : recipe.idDrink, isMealsPage) }
          >
            <img
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strMeal || recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p
              data-testid={ `${index}-card-name` }
            >
              {recipe.strMeal || recipe.strDrink}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
