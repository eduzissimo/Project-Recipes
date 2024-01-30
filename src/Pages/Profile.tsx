import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import ProfileDetails from '../Components/ProfileDetails';

function Profile() {
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserString = localStorage.getItem('user');
    if (storedUserString) {
      const storedUser = JSON.parse(storedUserString);
      setUserEmail(storedUser.email);
    }
  }, []);

  const handleDoneRecipes = () => {
    navigate('/done-recipes');
  };

  const handleFavoriteRecipes = () => {
    navigate('/favorite-recipes');
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  return (
    <div data-testid="page-title">
      <Header />
      <p data-testid="profile-email">
        { userEmail }
      </p>
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ handleDoneRecipes }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ handleFavoriteRecipes }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <ProfileDetails />
    </div>
  );
}

export default Profile;
