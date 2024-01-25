import { useLocation, useNavigate } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

const FIRST_LETTER = 'first-letter';

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const shouldShowSearchIcon = () => {
    return !['/profile', '/done-recipes', '/favorite-recipes'].includes(pathname);
  };

  const getTitlePages = () => {
    if (pathname === '/meals') return 'Meals';
    if (pathname === '/drinks') return 'Drinks';
    if (pathname === '/done-recipes') return 'Done Recipes';
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const fetchMeals = async (searchType: string, inputValue: string) => {
    switch (searchType) {
      case 'ingredient':
        return fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      case 'name': {
        const mealsResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
        const mealsData = await mealsResponse.json();

        if (mealsData.meals === null) {
          alert("Sorry, we haven't found any recipes for these filters");
          return null;
        } if (mealsData.meals.length === 1) {
          const { idMeal } = mealsData.meals[0];
          navigate(`/meals/${idMeal}`);
          return null;
        }
        return mealsResponse;
      }

      case FIRST_LETTER:
        return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
      default:
        return null;
    }
  };

  const fetchDrinks = async (searchType: string, inputValue: string) => {
    switch (searchType) {
      case 'ingredient':
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputValue}`);
      case 'name': {
        const drinksResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
        const drinksData = await drinksResponse.json();

        if (drinksData.drinks === null) {
          alert("Sorry, we haven't found any recipes for these filters");
          return null;
        } if (drinksData.drinks.length === 1) {
          const { idDrink } = drinksData.drinks[0];
          navigate(`/drinks/${idDrink}`);
          return null;
        }
        return drinksResponse;
      }

      case FIRST_LETTER:
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`);
      default:
        return null;
    }
  };

  return (
    <div data-testid="header-container">
      <header>
        <button
          type="button"
          onClick={ handleProfileClick }
        >
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </button>
        {(pathname === '/profile' || pathname === '/favorite-recipes') ? (
          <h1>
            { getTitlePages() }
          </h1>
        ) : (
          <h1
            data-testid="page-title"
          >
            { getTitlePages() }
          </h1>
        )}
        {shouldShowSearchIcon() && (
          <span>
            <SearchBar
              fetchFunction={ pathname === '/meals' ? fetchMeals
                : fetchDrinks }
            />
          </span>
        )}
      </header>
    </div>
  );
}

export default Header;
