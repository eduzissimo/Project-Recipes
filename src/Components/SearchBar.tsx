import { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

type SearchType = 'ingredient' | 'name' | 'first-letter';

const FIRST_LETTER: SearchType = 'first-letter';

function SearchBar() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [searchMethod, setSearchMethod] = useState<SearchType>('ingredient');
  const [searchValue, setSearchValue] = useState('');

  const handleSearchBarClick = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
  };

  const handleSearchMethodChange = (event: any) => {
    setSearchMethod(event.target.value);
  };

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = async () => {
    try {
      if (searchMethod === FIRST_LETTER && searchValue.length !== 1) {
        window.alert('Your search must have only 1 (one) character');
        return;
      }

      const response = await fetchRadio(searchMethod, searchValue);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRadio = async (searchType: SearchType, inputValue: string) => {
    let response; let
      data;

    switch (searchType) {
      case 'ingredient':
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputValue}`);
        data = await response.json();
        break;
      case 'name':
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`);
        data = await response.json();
        break;
      case FIRST_LETTER:
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`);
        data = await response.json();
        break;
      default:
        break;
    }

    return data;
  };

  return (
    <div>
      <button
        type="button"
        onClick={ handleSearchBarClick }
      >
        <img
          src={ searchIcon }
          alt="search icon"
          data-testid="search-top-btn"
        />
      </button>
      {isSearchBarVisible && (
        <div>
          <input
            type="text"
            value={ searchValue }
            onChange={ handleSearchInputChange }
            data-testid="search-input"
          />
          <label htmlFor="ingredient">
            <input
              type="radio"
              value="ingredient"
              checked={ searchMethod === 'ingredient' }
              onChange={ handleSearchMethodChange }
              data-testid="ingredient-search-radio"
            />
            Ingredient
          </label>
          <label htmlFor="name">
            <input
              type="radio"
              value="name"
              checked={ searchMethod === 'name' }
              onChange={ handleSearchMethodChange }
              data-testid="name-search-radio"
            />
            Name
          </label>
          <label htmlFor="first-letter">
            <input
              type="radio"
              value="first-letter"
              checked={ searchMethod === 'first-letter' }
              onChange={ handleSearchMethodChange }
              data-testid="first-letter-search-radio"
            />
            First letter
          </label>
          <button onClick={ handleSearch } data-testid="exec-search-btn">
            SEARCH
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
