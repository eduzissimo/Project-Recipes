import { useState, useCallback, ChangeEvent } from 'react';

const FIRST_LETTER = 'first-letter';

interface UseInputSearchProps {
  defaultSearchMethod: string;
  fetchFunction: (searchType: string, inputValue: string) => Promise<any>;
}

function useInputSearch({ defaultSearchMethod, fetchFunction }: UseInputSearchProps) {
  const [searchMethod, setSearchMethod] = useState(defaultSearchMethod);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchMethodChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchMethod(event.target.value);
    },
    [],
  );

  const handleSearchInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchValue(event.target.value);
    },
    [],
  );

  const handleSearch = async (setRecipes: (arg0: any) => void) => {
    try {
      if (searchMethod === FIRST_LETTER && searchValue.length !== 1) {
        window.alert('Your search must have only 1 (one) character');
        return;
      }
      const response = await fetchFunction(searchMethod, searchValue);

      if (response && response.meals && response.meals.length === 0) {
        window.alert("Sorry, we haven't found any recipes for these filters");
        return;
      }
      if (response && response.drinks && response.drinks.length === 0) {
        window.alert("Sorry, we haven't found any recipes for these filters");
        return;
      }

      setRecipes(response.meals || response.drinks);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    searchMethod,
    searchValue,
    handleSearchMethodChange,
    handleSearchInputChange,
    handleSearch,
  };
}

export default useInputSearch;
