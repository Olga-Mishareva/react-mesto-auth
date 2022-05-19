import logo from '../images/logo.svg';

function Header({ value }) {
  return (
    <header className="header">
      <div className="header__container">
        <img className="logo" src={logo} alt="Логотип"/>
        <div className="header__auth-container">
          <p className="header__auth">email@email.com</p>
          <p className="header__logout header__logout_visible">Выйти</p>
        </div>
      </div>
    </header>
  )
}

export default Header;