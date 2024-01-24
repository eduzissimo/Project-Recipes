import { NavLink } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../Styles/Footer.css';

function Footer() {
  return (
    <footer
      className="fixed-footer"
      data-testid="footer"
    >
      <nav>
        <NavLink to="/drinks">
          <button>
            <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
          </button>
        </NavLink>
        <NavLink to="/meals">
          <button>
            <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
          </button>
        </NavLink>
      </nav>

    </footer>
  );
}

export default Footer;
