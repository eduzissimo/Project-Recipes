import FilterRecipes from '../Components/FilterRecipes';
import Header from '../Components/Header';
import Recipes from '../Components/Recipes';

function Drinks() {
  return (
    <div data-testid="page-title">
      <Header />
      <FilterRecipes />
      <Recipes />
    </div>
  );
}

export default Drinks;
