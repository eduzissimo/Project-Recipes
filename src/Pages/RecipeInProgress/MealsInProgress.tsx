import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mealsInProgress, apiMealsCategory } from '../../hooks/useApiFilter';
import { RecipeDetails } from '../../types';

function MealsInProgress() {
  const params = useParams() as { id: string };
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
  const [ingredientsFilter, setIngredientsFilter] = useState<string[]>([]);
  const categoryList = apiMealsCategory();

  useEffect(() => {
    const fetchData = async () => {
      const result = await mealsInProgress(params);
      setRecipeDetails(result);
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    const fetchIngredients = async () => {
      setIngredientsFilter(await mealsInProgress(params));
    };
    fetchIngredients();
  }, [params]);

  const ingredientsArray = Object.keys(ingredientsFilter).filter(
    (key: any) => ingredientsFilter[key] !== null
    && ingredientsFilter[key] !== ''
    && key.startsWith('strIngredient'),
  ).map((key: any) => ingredientsFilter[key]);
  if (!recipeDetails || !categoryList) {
    return <div>Receita não encontrada.</div>;
  }

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
  } = recipeDetails;

  return (
    <div>
      <img
        src={ strMealThumb }
        alt="Recipe"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <p data-testid="recipe-category">
        Categoria:
        {strCategory}
      </p>
      <ul>
        <h2>Ingredients:</h2>
        {ingredientsArray.map((ingredient: string, index: number) => (
          <li key={ index }>
            <label
              data-testid={ `ingredient-step-${index}` }
            >
              <input
                type="checkbox"
              />
              {ingredient}
            </label>
          </li>
        ))}
      </ul>
      <p
        data-testid="instructions"
      >
        {strInstructions}
      </p>
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default MealsInProgress;
