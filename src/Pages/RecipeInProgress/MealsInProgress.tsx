import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { mealsInProgress, apiMealsCategory } from '../../hooks/useApiFilter';
import { RecipeDetails } from '../../types';

function MealsInProgress() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
  const categoryList = apiMealsCategory();

  useEffect(() => {
    const fetchData = async () => {
      const result = await mealsInProgress({ id });
      setRecipeDetails(result);
    };

    fetchData();
  }, [id]);

  if (!recipeDetails || !categoryList) {
    return <div>Receita não encontrada.</div>;
  }

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
    ingredientsList,
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
        {ingredientsList && ingredientsList.map((ingredient: string, index: number) => (
          <li key={ index }>{ingredient}</li>
        ))}
      </ul>
      <p data-testid="instructions">{strInstructions}</p>
      <button data-testid="share-btn">Compartilhar</button>
      <button data-testid="favorite-btn">Favoritar</button>
      <button data-testid="finish-recipe-btn">Finalizar Receita</button>
    </div>
  );
}

export default MealsInProgress;
