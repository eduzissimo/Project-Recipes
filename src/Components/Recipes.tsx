import Fetcher from '../utils/fetcher';

function Recipes({ recipes }:any) {
  const { data: search, loading, error } = Fetcher('search');
  const recipesData = recipes.length > 0 ? recipes : search;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // adicionar a logica do handler

  return (
    <div className="recipesContainer">
      <h1 className="title">Recipes</h1>
      <div>
        {recipesData?.slice(0, 12).map((recipe: any, index: any) => (
          <div // alterar de div para btn
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
