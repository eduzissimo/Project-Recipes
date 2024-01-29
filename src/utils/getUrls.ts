export type URLoptions = 'search' | 'categories' | 'filter';

export const getUrl = (option:URLoptions, isMealsPage:boolean) => {
  const urls = {
    search: isMealsPage ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=',
    categories: isMealsPage ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list',
    filter: isMealsPage ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
      : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=',
  };
  return urls[option];
};

// getUrls está sendo responsavel por armazenar as urls e trazer de acordo com a condicional
