import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


export function RecipesDetails() {
  const { id } = useParams<{ id: string }>();
  const [recipeDetails, setRecipeDetails] = useState();
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

  const { strMealThumb, strMeal, strCategory, strInstructions ,strYouTube, strDrinkThumb, strDrink   } = recipeDetails;
  console.log(recipeDetails)

  const validUrl = (givenUrl) => givenUrl.replace('watch', 'embed').replace(/\?v=/g, '/');

  return (
    <div>
      <img src={ strMealThumb || strDrinkThumb } alt="Foto Da Refeição" />
      <h2>{ strMeal || strDrink }</h2>
      { strCategory ? <span>{ strCategory }</span> : null }
      <button
      onClick={ () => navigate(-1)}
      >
        voltar
      </button>
    </div>
  );
};

