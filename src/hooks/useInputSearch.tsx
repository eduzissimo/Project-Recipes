import { useState, useCallback, ChangeEvent } from 'react';

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

  const handleSearch = useCallback(async () => {
    try {
      if (searchMethod === 'first-letter' && searchValue.length !== 1) {
        window.alert('Your search must have only 1 (one) character');
        return;
      }

      const response = await fetchFunction(searchMethod, searchValue);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }, [searchMethod, searchValue, fetchFunction]);

  return {
    searchMethod,
    searchValue,
    handleSearchMethodChange,
    handleSearchInputChange,
    handleSearch,
  };
}

export default useInputSearch;
