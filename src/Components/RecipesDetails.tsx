import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import YouTube from 'react-youtube';

export function RecipesDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipeDetails, setRecipeDetails] = useState<any>(null);
  const navigate = useNavigate(); // Adicionando o hook useNavigate

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const isMealPage = window.location.pathname.includes('/meals');
      const API = isMealPage
        ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

      try {
        const response = await fetch(API);
        const data = await response.json();
        isMealPage ? setRecipeDetails(data.meals[0]) : setRecipeDetails(data.drinks[0]);
      } catch (error) {
        // Tratar erros de requisição
        console.error('Erro ao buscar detalhes da receita:', error);
        // Navegar de volta para a página anterior em caso de erro
        navigate(-1);
      }
    };

    fetchRecipeDetails();
  }, [id, navigate]);

  if (!recipeDetails) {
    return <p>Loading...</p>;
  }

  const { strMealThumb, strMeal, strCategory, strInstructions, strYoutube, strDrinkThumb, strDrink, strAlcoholic } = recipeDetails;

  // Obtendo as chaves que contêm os ingredientes e as medidas
  const ingredientsKeys = Object.keys(recipeDetails).filter(key => key.startsWith('strIngredient') && recipeDetails[key]);
  const measuresKeys = Object.keys(recipeDetails).filter(key => key.startsWith('strMeasure') && recipeDetails[key]);

  // Mapeando as chaves dos ingredientes e medidas para os seus valores correspondentes
  const ingredients = ingredientsKeys.map(key => recipeDetails[key]);
  const measures = measuresKeys.map(key => recipeDetails[key]);

  const getYouTubeVideoId = (url: string) => {
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/);
    return videoIdMatch ? videoIdMatch[1] : '';
  };

  return (
    <div>
      <img
        src={strMealThumb || strDrinkThumb}
        width={360}
        alt="Foto Da Refeição"
        data-testid="recipe-photo"
      />
      <h2
        data-testid="recipe-title"
      >
        {strMeal || strDrink}
      </h2>
      {strCategory && <span data-testid="recipe-category" >{strAlcoholic || strCategory}</span>}
      <ul
      
      >
        {/* Renderizando a lista de ingredientes e medidas */}
        {ingredients.map((ingredient, index) => (
          <li
          key={`ingredient-${index}`}
          data-testid={`${index}-ingredient-name-and-measure`}
          >
            {ingredient} - {measures[index]}
          </li>
        ))}
      </ul>
      <p
        data-testid="instructions"
      >
        {strInstructions}
      </p>
      <div
      data-testid="video"
      >
        {strYoutube && <YouTube videoId={getYouTubeVideoId(strYoutube)} opts={{ width: '360', height: '415' }}/>}
      </div>
      <button onClick={() => navigate(-1)}>voltar</button>
    </div>
  );
};
