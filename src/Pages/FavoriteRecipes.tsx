import { FavoritRecipes } from '../Components/FavoritRecipes';
import Header from '../Components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header />
      <h1 data-testid="page-title">
        Favorite Recipes
      </h1>
      <FavoritRecipes />
    </div>
  );
}

export default FavoriteRecipes;
