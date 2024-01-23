import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import Meals from './Pages/Meals';
import FavoriteRecipes from './Pages/FavoriteRecipes';
import Drinks from './Pages/Drinks';
import DoneRecipes from './Pages/DoneRecipes';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/meals" element={ <Meals /> } />
        <Route path="/drinks" element={ <Drinks /> } />
        <Route path="/favorite-recipes" element={ <FavoriteRecipes /> } />
        <Route path="/done-recipes" element={ <DoneRecipes /> } />
      </Routes>
    </Router>
  );
}

export default App;
