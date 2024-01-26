import useFetch from '../hooks/useFetch';

function FilterRecipes() {
  const { pathname } = window.location;
  const isMealsPage = pathname.includes('/meals');

  const categoriesAPI = isMealsPage
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  const { data, loading, error } = useFetch(categoriesAPI);

  const categories = data?.meals || data?.drinks;

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
    </div>
  );
}

export default FilterRecipes;
