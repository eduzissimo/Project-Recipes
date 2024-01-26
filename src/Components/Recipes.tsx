import Fetcher from '../utils/fetcher';
import { useNavigate } from 'react-router-dom';

function Recipes({ recipes }:any) {
  const { data: search, loading, error } = Fetcher('search');
  const navigate = useNavigate();
  const recipesData = recipes.length > 0 ? recipes : search;

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
    <div className="recipesContainer">
      <h1 className="title">Recipes</h1>
      <div>
        {recipesData?.slice(0, 12).map((recipe: any, index: any) => (
          <div // alterar de div para btn
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
            <p className="recipesText" data-testid={ `${index}-card-name` }>
              {recipe.strMeal || recipe.strDrink}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Recipes;
