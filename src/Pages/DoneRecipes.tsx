import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Components/Header';
import shareIcon from '../images/shareIcon.svg';

export type Recipe = {
  image: string;
  name: string;
  alcoholicOrNot: string;
  category: string;
  nationality: string;
  doneDate: string;
  id: string;
  tags: string[];
  type: string;
};

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [filterType, setFilterType] = useState<string | null>(null);
  const [copyText, setCopyText] = useState(false);

  const doneRecipesFromLocalStorage = () => {
    const localStorageDoneRecipes = localStorage.getItem('doneRecipes');

    if (localStorageDoneRecipes) {
      const parsedRecipes: Recipe[] = JSON.parse(localStorageDoneRecipes);
      setDoneRecipes(parsedRecipes);
      setFilteredRecipes(parsedRecipes); //  exibe todas as receitas
    }
  };

  useEffect(() => {
    doneRecipesFromLocalStorage();
  }, []);

  const handleFilter = (type: string | null) => {
    if (type === null) {
      // mostra todas as receitas
      setFilteredRecipes(doneRecipes);
    } else {
      // filtra por tipo (meal ou drink)
      const filtered = doneRecipes.filter((recipe: any) => recipe.type === type);
      setFilteredRecipes(filtered);
    }
    setFilterType(type);
  };

  const handleShareClick = (type: string, id: string) => {
    const link = `${window.location.origin}/${type}s/${id}`;
    navigator.clipboard.writeText(link);
    setCopyText(true);
  };

  return (
    <div data-testid="page-title">
      <Header />
      <div>
        <button data-testid="filter-by-all-btn" onClick={ () => handleFilter(null) }>
          All
        </button>
        <button data-testid="filter-by-meal-btn" onClick={ () => handleFilter('meal') }>
          Meals
        </button>
        <button data-testid="filter-by-drink-btn" onClick={ () => handleFilter('drink') }>
          Drinks
        </button>
      </div>

      {filteredRecipes.map((recipe: Recipe, index: number) => (
        <div key={ index }>
          <div>
            <NavLink to={ `${window.location.origin}/${recipe.type}s/${recipe.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
                style={ { cursor: 'pointer',
                  borderRadius: '10px',
                  width: '25%',
                  height: '25%' } }
              />
            </NavLink>

            <NavLink to={ `${window.location.origin}/${recipe.type}s/${recipe.id}` }>
              <p data-testid={ `${index}-horizontal-name` }>{recipe.name}</p>
            </NavLink>
          </div>

          <p data-testid={ `${index}-horizontal-top-text` }>{recipe.category}</p>
          <p data-testid={ `${index}-horizontal-done-date` }>{recipe.doneDate}</p>
          <span
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipe.nationality} - ${recipe.category}` }
            {' '}
            {recipe.alcoholicOrNot}
          </span>
          <button onClick={ () => handleShareClick(recipe.type, recipe.id) }>
            <img
              src={ shareIcon }
              alt="shareIcon"
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          { copyText && <p>Link copied!</p> }
          {recipe.tags.map((tag: string, tagIndex: number) => (
            <span
              key={ tagIndex }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              {tag}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
