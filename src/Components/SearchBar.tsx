import useInputSearch from '../hooks/useInputSearch';
import searchIcon from '../images/searchIcon.svg';

const FIRST_LETTER = 'first-letter';

interface SearchBarProps {
  fetchFunction: (searchType: string, inputValue: string) => Promise<any>;
}

function SearchBar({ fetchFunction }: SearchBarProps) {
  const {
    searchMethod,
    searchValue,
    handleSearchMethodChange,
    handleSearchInputChange,
    handleSearch,
  } = useInputSearch({ defaultSearchMethod: 'ingredient', fetchFunction });

  return (
    <div>
      <button type="button" onClick={ handleSearch }>
        <img src={ searchIcon } alt="search icon" data-testid="search-top-btn" />
      </button>
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
        <label htmlFor={ FIRST_LETTER }>
          <input
            type="radio"
            value={ FIRST_LETTER }
            checked={ searchMethod === FIRST_LETTER }
            onChange={ handleSearchMethodChange }
            data-testid="first-letter-search-radio"
          />
          First letter
        </label>
        <button onClick={ handleSearch } data-testid="exec-search-btn">
          SEARCH
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
