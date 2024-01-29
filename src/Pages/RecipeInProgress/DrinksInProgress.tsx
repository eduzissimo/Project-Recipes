import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { drinksInProgress, apiDrinksCategory } from '../../hooks/useApiFilter';
import { RecipeDetails } from '../../types';

function DrinksInProgress() {
  const { id } = useParams();
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails | null>(null);
  const categoryList = apiDrinksCategory();

  useEffect(() => {
    const fetchData = async () => {
      const result = await drinksInProgress({ id });
      setRecipeDetails(result);
    };

    fetchData();
  }, [id]);

  if (!recipeDetails || !categoryList) {
    return <div>Receita não encontrada.</div>;
  }

  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
    ingredientsList,
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
      <ul>
        {ingredientsList && ingredientsList.map((ingredient: string, index: number) => (
          <li key={ index }>{ingredient}</li>
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
