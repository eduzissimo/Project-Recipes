import useFetch from '../hooks/useFetch';

function Recipes() {
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

  return (
    <div className="recipesContainer">
      <h1 className="title">Recipes</h1>
      <div>
        {recipes?.slice(0, 12).map((recipe: any, index: any) => (
          <div
            className="recipesCard"
            key={ recipe.idMeal || recipe.idDrink }
            data-testid={ `${index}-recipe-card` }
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
