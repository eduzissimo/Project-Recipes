import { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

function SearchBar() {
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);

  const handleSearchBarClick = () => {
    setIsSearchBarVisible(!isSearchBarVisible);
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
          <input type="text" data-testid="search-input" />
          <label htmlFor="ingredient">Ingredient</label>
          <input type="radio" data-testid="ingredient-search-radio" />
          <label htmlFor="name">Name</label>
          <input type="radio" data-testid="name-search-radio" />
          <label htmlFor="first-letter">First letter</label>
          <input type="radio" data-testid="first-letter-search-radio" />
          <button data-testid="exec-search-btn">SEARCH</button>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
