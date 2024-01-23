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
          <input
            type="text"
            data-testid="search-input"
          />
        </div>
      )}
    </div>
  );
}

export default SearchBar;
