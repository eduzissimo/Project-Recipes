import Fetcher from '../utils/fetcher';

function FilterRecipes() {
  const mealsURLbtn = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const drinksURLbtn = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const { data, loading, error, isMealsPage } = Fetcher(mealsURLbtn, drinksURLbtn);

  const categories = isMealsPage ? data?.meals : data?.drinks;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <div>
        {categories.slice(0, 5).map((category:any) => (
          <button
            key={ category.strCategory }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      <div>
        <button data-testid="All-category-filter">All</button>
      </div>
    </div>
  );
}

export default FilterRecipes;
