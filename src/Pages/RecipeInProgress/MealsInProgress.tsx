import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mealsInProgress } from '../../hooks/useApiFilter';
import blackHeart from '../../images/blackHeartIcon.svg';
import whiteHeart from '../../images/whiteHeartIcon.svg';
import { FavoriteRecipeType } from '../../types';
import styled from 'styled-components';

const ImageRecipe = styled.img`
  width: 100%;
`;

function MealsInProgress() {
  const params = useParams() as { id: string };
  const navigate = useNavigate();
  const [recipeDetails, setRecipeDetails] = useState<any>('');
  const [ingredientsFilter, setIngredientsFilter] = useState<any>('');
  const [checkedIngredients, setCheckedIngredients] = useState<string[]>([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const [copyText, setCopyText] = useState(false);
  const [allIngredientsChecked, setAllIngredientsChecked] = useState(false);

  useEffect(() => { // esse é usado para requisição da API de comida em si
    const fetchData = async () => {
      const result = await mealsInProgress(params);
      setRecipeDetails(result);
    };
    fetchData();
  }, [params]);

  useEffect(() => { // esse é a requisição para os ingredientes
    const fetchIngredients = async () => {
      setIngredientsFilter(await mealsInProgress(params));
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
    setIsFavorited(isFav);
  }, [params]);
  useEffect(() => { // esse é para salvar o progresso no localStorage
    localStorage.setItem('inProgressRecipes', JSON.stringify(checkedIngredients));
    setAllIngredientsChecked(ingredientsArray.every(
      (ingredient) => checkedIngredients.includes(ingredient),
    ));
  }, [checkedIngredients]);

  const handleFavoriteClick = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteRecipes') || '[]');
    const recipeFavDetails = {
      id: params.id,
      type: 'meal',
      nationality: recipeDetails.strArea,
      category: recipeDetails.strCategory,
      alcoholicOrNot: '',
      name: recipeDetails.strMeal,
      image: recipeDetails.strMealThumb,
    };
    if (isFavorited) {
      const updatedFavorites = favorites.filter(
        (recipe: any) => recipe.id !== recipeFavDetails.id,
      );
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, recipeFavDetails];
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavorites));
    }
    setIsFavorited((state) => !state);
  };

  const handleShareClick = () => {
    const link = `${window.location.origin}/meals/${params.id}`;
    navigator.clipboard.writeText(link);
    setCopyText(true);
  };

  const handleCheckboxChange = (ingredient: string) => {
    if (Array.isArray(checkedIngredients) && checkedIngredients.includes(ingredient)) {
      setCheckedIngredients(checkedIngredients.filter((item) => item !== ingredient));
    } else {
      setCheckedIngredients(Array.isArray(checkedIngredients) ? [...checkedIngredients,
        ingredient] : [ingredient]);
    }
  };

  const handleFinishRecipe = () => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes') || '[]');
    const recipeFinishedDetails = {
      id: params.id,
      type: 'meal',
      nationality: recipeDetails.strArea,
      category: recipeDetails.strCategory,
      alcoholicOrNot: '',
      name: recipeDetails.strMeal,
      image: recipeDetails.strMealThumb,
      doneDate: new Date().toISOString(),
      tags: recipeDetails.strTags ? recipeDetails.strTags.split(',') : [],
    };
    const updatedDoneRecipes = [...doneRecipes, recipeFinishedDetails];
    localStorage.setItem('doneRecipes', JSON.stringify(updatedDoneRecipes));
    navigate('/done-recipes');
  };

  const ingredientsArray = Object.keys(ingredientsFilter).filter(
    (key: any) => ingredientsFilter[key] !== null
    && ingredientsFilter[key] !== ''
    && key.startsWith('strIngredient'),
  ).map((key: any) => ingredientsFilter[key]);

  const {
    strMealThumb,
    strMeal,
    strCategory,
    strInstructions,
  } = recipeDetails;

  return (
    <div>
      <ImageRecipe
        src={ strMealThumb }
        alt="Recipe"
        data-testid="recipe-photo"
      />
      <h1 data-testid="recipe-title">{strMeal}</h1>
      <p data-testid="recipe-category">
        Category:
        {' '}
        {strCategory}
      </p>
      <ul>
        <h2>Ingredients:</h2>
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
      <h2>Instructions:</h2>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        onClick={ handleFavoriteClick }
      >
        <img
          data-testid="favorite-btn"
          src={ isFavorited ? blackHeart : whiteHeart }
          alt="Favorite"
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

export default MealsInProgress;
