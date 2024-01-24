import Header from '../Components/Header';
import Recipes from '../Components/Recipes';

function Meals() {
  return (
    <div data-testid="page-title">
      <Header />
      <Recipes />
    </div>
  );
}

export default Meals;
