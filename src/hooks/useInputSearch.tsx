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

  const handleSearch = async () => {
    try {
      if (searchMethod === FIRST_LETTER && searchValue.length !== 1) {
        window.alert('Your search must have only 1 (one) character');
        return;
      }
      const response = await fetchFunction(searchMethod, searchValue);
      const data = await response.json();
      if (data && data.meals && data.meals.length === 0) {
        window.alert("Sorry, we haven't found any recipes for these filters");
        return;
      }
      if (data && data.drinks && data.drinks.length === 0) {
        window.alert("Sorry, we haven't found any recipes for these filters");
        return;
      }
      console.log(response);
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
