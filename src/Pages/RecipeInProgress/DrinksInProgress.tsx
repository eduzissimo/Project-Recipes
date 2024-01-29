import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { drinksInProgress, apiDrinksCategory } from '../../hooks/useApiFilter';
import { RecipeDetails } from '../../types';

function DrinksInProgress() {
  const params = useParams() as { id: string };
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
  const [ingredientsFilter, setIngredientsFilter] = useState<string[]>([]);
  const categoryList = apiDrinksCategory();

  useEffect(() => {
    const fetchData = async () => {
      const result = await drinksInProgress(params);
      setRecipeDetails(result);
    };
    fetchData();
  }, [params]);

  useEffect(() => {
    const fetchIngredients = async () => {
      setIngredientsFilter(await drinksInProgress(params));
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
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = recipeDetails;

  return (
    <div>
      <img
        src={ strDrinkThumb }
        alt="Recipe"
        data-testid="recipe-photo"
      />
      <h1
        data-testid="recipe-title"
      >
        {strDrink}
      </h1>
      <p data-testid="recipe-category">
        Alcoólico:
        {strAlcoholic}
      </p>
      <h2> Ingredients: </h2>
      <ul>
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

export default DrinksInProgress;
