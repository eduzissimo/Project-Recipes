import { useState } from 'react';
import Fetcher from '../utils/fetcher';

function FilterRecipes({ setRecipes }:any) {
  const [selectCategory, setSelectCategory] = useState('');

  const clearFilter = () => {
    setSelectCategory('');
    setRecipes([]);
  };

  const { data: categories, loading, error } = Fetcher('categories');

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
            onClick={ () => setSelectCategory(category.strCategory) }
            data-testid={ `${category.strCategory}-category-filter` }
          >
            {category.strCategory}
          </button>
        ))}
      </div>
      <div>
        <button data-testid="All-category-filter" onClick={ clearFilter }>All</button>
      </div>
      {}
    </div>
  );
}

export default FilterRecipes;
