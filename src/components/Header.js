import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ loggedIn, email, onSignOut }) {
  return (
    <header className="header">
      <div className="header__container">
        <img className="logo" src={logo} alt="Логотип"/>
        <div className="header__auth-container">
          <p className="header__email">{email}</p>
          <button onMouseDown={onSignOut} 
            className={`header__logout header__logout${loggedIn ? '_active' : ''}`}>
            Выйти
          </button>
          <nav className={`header__nav header__nav${!loggedIn ? '_active' : ''}`}>
            <NavLink to="/sign-up" activeClassName="header__link" className="header__link_visible">Регистрация</NavLink>
            <NavLink to="/sign-in" activeClassName="header__link" className="header__link_visible">Войти</NavLink>
          </nav>  
        </div>
      </div>
    </header>
  )
}

export default Header;