import { useLocation, useNavigate } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const shouldShowSearchIcon = () => {
    return !['/profile', '/done-recipes', '/favorite-recipes'].includes(pathname);
  };

  const getTitlePages = () => {
    if (pathname === '/meals') return 'Meals';
    if (pathname === '/drinks') return 'Drinks';
    if (pathname === '/done-recipes') return 'Done Recipes';
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <div data-testid="header-container">
      <header>
        <button
          type="button"
          onClick={ handleProfileClick }
        >
          <img
            src={ profileIcon }
            alt="profile icon"
            data-testid="profile-top-btn"
          />
        </button>
        {(pathname === '/profile' || pathname === '/favorite-recipes') ? (
          <h1>
            { getTitlePages() }
          </h1>
        ) : (
          <h1
            data-testid="page-title"
          >
            { getTitlePages() }
          </h1>
        )}
        {shouldShowSearchIcon() && (
          <span>
            <SearchBar />
          </span>
        )}
      </header>
    </div>
  );
}

export default Header;
