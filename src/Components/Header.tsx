import React from 'react';
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
      case 'name':
        return fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
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
      case 'name':
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputValue}`);
      case FIRST_LETTER:
        return fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputValue}`);
      default:
        return null;
    }
  };

  return (
    <div data-testid="header-container">
      <header>
        <button type="button" onClick={ handleProfileClick }>
          <img src={ profileIcon } alt="profile icon" data-testid="profile-top-btn" />
        </button>
        <h1 data-testid="page-title">{getTitlePages()}</h1>
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
