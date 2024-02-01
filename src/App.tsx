import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Meals from './Pages/Meals';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Drinks from './Pages/Drinks';
import DoneRecipes from './Pages/DoneRecipes';
import Layout from './Components/Layout';
import { NotFound } from './Pages/NotFound';
import { DetailsRecipes } from './Pages/DetailsRecipes';
import RecipeInProgress from './Pages/RecipeInProgress/RecipeInProgress';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Layout /> }>
        <Route index element={ <Login /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
      </Route>
      <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
      <Route path="/done-recipes" element={ <DoneRecipes /> } />
      <Route path="/meals/:id" element={ <DetailsRecipes /> } />
      <Route path="/drinks/:id" element={ <DetailsRecipes /> } />
      <Route path="/meals/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="/drinks/:id/in-progress" element={ <RecipeInProgress /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
