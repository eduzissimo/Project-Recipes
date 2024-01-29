import useFetch from '../hooks/useFetch';
import { URLoptions, getUrl } from './getUrls';

function Fetcher(options: URLoptions, complement = '') {
  const { pathname } = window.location;
  const isMealsPage = pathname.includes('/meals');
  const baseURL = getUrl(options, isMealsPage);

  const API = `${baseURL}${complement}`;
  const { data: result, loading, error } = useFetch(API);

  const data = isMealsPage ? result?.meals : result?.drinks;

  return { data, loading, error, isMealsPage };
}

export default Fetcher;

// Fetcher está sendo o responsavel por verificar em qual tela o usuario está e retornar o data com base nas opções passadas para ele
// caso precise ser dinamica a url... é só adicionar o complemento ao chamar o Fetcher
