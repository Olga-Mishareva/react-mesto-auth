import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';
import closeBtn from '../images/close-icon.svg';
import burgerBtn from '../images/burger-menu.svg';

function Header({ loggedIn, email, resetValidation, onSignOut }) {
  const [isInvisible, setIsInvisible] = useState(true);
  const mobileButton = isInvisible ? burgerBtn : closeBtn;

  function handleBurgerButton() {
    isInvisible ? setIsInvisible(false): setIsInvisible(true);
  }

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo-container">
          <img className="logo" src={logo} alt="Логотип"/>
          <button className="header__burger-btn" type="button" 
            style={{ backgroundImage: `url(${mobileButton})`}}
            onMouseDown={handleBurgerButton}></button>
        </div>
        <div className={`header__auth-container header__auth-container${isInvisible ? '_invisible' : ''}`}>
          <p className="header__email">{email}</p>
          <button onMouseDown={onSignOut} 
            className={`header__logout header__logout${loggedIn ? '_active' : ''}`}>
            Выйти
          </button>
          <nav className={`header__nav header__nav${!loggedIn ? '_active' : ''}`}>
            <NavLink to="/sign-up" activeClassName="header__link" className="header__link_visible" onClick={resetValidation}>Регистрация</NavLink>
            <NavLink to="/sign-in" activeClassName="header__link" className="header__link_visible" onClick={resetValidation}>Войти</NavLink>
          </nav>  
        </div>
      </div>
    </header>
  )
}

export default Header;
