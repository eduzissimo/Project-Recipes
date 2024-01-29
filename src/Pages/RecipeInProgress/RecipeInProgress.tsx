import MealsInProgress from './MealsInProgress';
import DrinksInProgress from './DrinksInProgress';

function RecipeInProgress() {
  const route = window.location.pathname.includes('meals');
  return (
    <div>
      { route ? <MealsInProgress /> : <DrinksInProgress /> }
    </div>
  );
}

export default RecipeInProgress;
