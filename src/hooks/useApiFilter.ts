export async function apiMealsCategory() {
  const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.meals;
}

export async function apiDrinksCategory() {
  const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
  const data = await response.json();
  return data.drinks;
}

export async function mealsInProgress(params: any) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${params.id}`);
  const data = await response.json();
  const filterData = data.meals[0];
  return filterData;
}
export async function drinksInProgress(params: any) {
  const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`);
  const data = await response.json();
  const filterData = data.drinks[0];
  return filterData;
}
