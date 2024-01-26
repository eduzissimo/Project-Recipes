import useFetch from '../hooks/useFetch';

function Fetcher(mealsURL: string, drinksURL: string) {
  const { pathname } = window.location;
  const isMealsPage = pathname.includes('/meals');

  const API = isMealsPage ? mealsURL : drinksURL;
  const { data, loading, error } = useFetch(API);

  return { data, loading, error, isMealsPage };
}

export default Fetcher;
