import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { drinksInProgress } from '../../hooks/useApiFilter';
import { FavoriteRecipeType } from '../../types';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import styled from 'styled-components';

const ImageRecipe = styled.img`
  width: 100%;
`;

function DrinksInProgress() {
  const params = useParams() as { id: string };
  const navigate = useNavigate();
  const [recipeDetails, setRecipeDetails] = useState<any>('');
  const [ingredientsFilter, setIngredientsFilter] = useState<any>('');
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copyText, setCopyText] = useState(false);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);

  useEffect(() => { // esse é usado para requisição da API de bebida em si
    const fetchData = async () => {
      const result = await drinksInProgress(params);
      setRecipeDetails(result);
      setIngredientsFilter(result);
    };
    fetchData();
  }, [params]);

  useEffect(() => { // esse é a requisição para os ingredientes
    const fetchIngredients = async () => {
      setIngredientsFilter(await drinksInProgress(params));
    };
    fetchIngredients();
  }, [params]);

  useEffect(() => { // esse é para recuperar o progresso salvo no localStorage
    const savedProgress = localStorage.getItem('inProgressRecipes');
    if (savedProgress) {
      setCheckedIngredients(JSON.parse(savedProgress));
    }
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isFav = favorites.some((recipe: FavoriteRecipeType) => recipe.id === params.id);
    setIsFavorite(isFav);
  }, [params]);

  useEffect(() => { // esse é usado para requisição da API de bebida em si
    const savedProgress = localStorage.getItem('inProgressRecipes');
    if (savedProgress) {
      setCheckedIngredients(JSON.parse(savedProgress));
    }
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const isFav = favorites.some((recipe: FavoriteRecipeType) => recipe.id === params.id);
    setIsFavorite(isFav);
  }, [params]);

  useEffect(() => {
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedIngredients));
    setAllIngredientsChecked(
      ingredientsArray.every((ingredient) => checkedIngredients.includes(ingredient)),
    );
  }, [checkedIngredients]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const recipeFavDetails = {
      id: params.id,
      type: 'drink',
      nationality: '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: 'Alcoholic',
      name: recipeDetails.strDrink,
      image: recipeDetails.strDrinkThumb,
    };
    const isRecipeFavorited = favorites.some(
      (recipe: FavoriteRecipeType) => recipe.id === recipeFavDetails.id,
    );
    if (isRecipeFavorited) {
      const updatedFavorites = favorites.filter(
        (recipe: FavoriteRecipeType) => recipe.id !== recipeFavDetails.id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, recipeFavDetails];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    }
    setIsFavorite((prevState) => !prevState);
  };

  const handleShareClick = () => {
    const link = `${window.location.origin}/drinks/${params.id}`;
    navigator.clipboard.writeText(link);
    setCopyText(true);
  };

  const handleCheckboxChange = (ingredient: any) => {
    if (checkedIngredients.includes(ingredient)) {
      setCheckedIngredients(checkedIngredients.filter((item) => item !== ingredient));
    } else {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    }
  };

  const ingredientsArray = Object.keys(ingredientsFilter).filter(
    (key: any) => ingredientsFilter[key] !== null
    && ingredientsFilter[key] !== ''
    && key.startsWith('strIngredient'),
  ).map((key: any) => ingredientsFilter[key]);

  const {
    strDrinkThumb,
    strDrink,
    strAlcoholic,
    strInstructions,
  } = recipeDetails;

  const handleFinishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const recipeFinishedDetails = {
      id: params.id,
      type: 'drink',
      nationality: '',
      category: recipeDetails.strCategory,
      alcoholicOrNot: 'Alcoholic',
      name: recipeDetails.strDrink,
      image: recipeDetails.strDrinkThumb,
      doneDate: new Date().toISOString(),
      tags: recipeDetails.strTags ? recipeDetails.strTags.split(',') : [],
    };
    const updatedFinishedRecipe = [...doneRecipes, recipeFinishedDetails];
    localStorage.setItem('doneRecipes', JSON.stringify(updatedFinishedRecipe));
    navigate('/done-recipes');
  };

  return (
    <div>
      <ImageRecipe
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
        Alcoholic:
        {strAlcoholic}
      </p>
      <h2> Ingredients: </h2>
      <ul>
        {ingredientsArray.map((ingredient: string, index: number) => (
          <li key={ index }>
            <label
              data-testid={ `${index}-ingredient-step` }
              style={ { textDecoration: checkedIngredients.includes(ingredient)
                ? 'line-through' : 'none' } }
            >
              <input
                type="checkbox"
                onChange={ () => handleCheckboxChange(ingredient) }
                checked={ checkedIngredients.includes(ingredient) }
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
      <button
        onClick={ handleFavoriteClick }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorite ? blackHeart : whiteHeart }
          alt="Favorite/Unfavorite"
        />
      </button>
      <button
        data-testid="share-btn"
        onClick={ handleShareClick }
      >
        Share
      </button>
      {copyText && (
        <div data-testid="share-message">
          Link copied!
        </div>
      )}
      <button
        data-testid="finish-recipe-btn"
        disabled={ !allIngredientsChecked }
        onClick={ () => handleFinishRecipe() }
      >
        Finish recipe
      </button>
    </div>
  );
}
export default DrinksInProgress;
