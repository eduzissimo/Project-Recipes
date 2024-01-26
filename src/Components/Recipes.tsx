import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../hooks/useFetch';

function Recipes() {
  const navigate = useNavigate();
  const { pathname } = window.location;
  const isMealsPage = pathname.includes('/meals');
  const API = isMealsPage
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const { data, loading, error } = useFetch(API);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const recipes = isMealsPage ? data?.meals : data?.drinks;
  console.log(recipes);

  const handleCardClick = (recipeId: string, isMealsPg: boolean) => {
    const route = isMealsPg ? `/meals/${recipeId}` : `/drinks/${recipeId}`;
    navigate(route);
  };

  return (
    <div>
      <h1>Recipes</h1>
      <div>
        {recipes?.slice(0, 12).map((recipe: any, index: any) => (
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
