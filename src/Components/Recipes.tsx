import { useNavigate } from 'react-router-dom';
import Fetcher from '../utils/fetcher';

function Recipes({ recipes }:any) {
  const { data: search, loading, error, isMealsPage } = Fetcher('search');
  const recipesData = recipes && recipes.length > 0 ? recipes : search;

  const navigate = useNavigate();
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

  const initializeFavoriteRecipes = () => {
    const existingFavorites = localStorage.getItem('favoriteRecipes');
    if (!existingFavorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    }
  };

  initializeFavoriteRecipes();

  return (
    <span>
      <h1 className="title">Recipes</h1>
      <div>
        {recipesData?.slice(0, 12).map((recipe: any, index: any) => (
          <button
            className="recipesCard"
            key={ recipe.idMeal || recipe.idDrink }
            data-testid={ `${index}-recipe-card` }
            onClick={ () => handleCardClick(isMealsPage
              ? recipe.idMeal : recipe.idDrink, isMealsPage) }
          >
            <img
              className="recipesImg"
              src={ recipe.strMealThumb || recipe.strDrinkThumb }
              alt={ recipe.strMeal || recipe.strDrink }
              data-testid={ `${index}-card-img` }
            />
            <p
              className="recipesText"
              data-testid={ `${index}-card-name` }
            >
              {recipe.strMeal || recipe.strDrink}
            </p>
          </button>
        ))}
      </div>
    </span>
  );
}

export default Recipes;
