import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../Styles/RecipeDetails.module.css';

function StartContinueButton({ recipeDetails }: any) {
  const [isRecipeStarted, setIsRecipeStarted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes')
     || '[]');
    const recipeInProgress = inProgressRecipes.meals?.[recipeDetails.idMeal]
    || inProgressRecipes.drinks?.[recipeDetails.idDrink];
    setIsRecipeStarted(!!recipeInProgress);
  }, [recipeDetails]);

  const handleStartRecipe = () => {
    const isMeal = 'idMeal' in recipeDetails;
    const recipeId = isMeal ? recipeDetails.idMeal : recipeDetails.idDrink;

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...JSON.parse(localStorage.getItem('inProgressRecipes') || '[]'),
      [isMeal ? 'meals' : 'drinks']: {
        ...JSON.parse(localStorage.getItem('inProgressRecipes')
        || '[]')[isMeal ? 'meals' : 'drinks'],
        [recipeId]: [],
      },
    }));

    const routeType = isMeal ? 'meals' : 'drinks';
    const inProgressRoute = `/${routeType}/${recipeId}/in-progress`;
    navigate(inProgressRoute);
  };

  return (
    <button
      className={ styles.startContinueButton }
      data-testid="start-recipe-btn"
      onClick={ handleStartRecipe }
    >
      {isRecipeStarted ? 'Continue Recipe' : 'Start Recipe'}
    </button>
  );
}

export default StartContinueButton;
