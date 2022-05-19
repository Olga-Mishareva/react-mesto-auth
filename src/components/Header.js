import logo from '../images/logo.svg';

function Header({ value }) {
  return (
    <header className="header">
      <div className="header__container">
        <img className="logo" src={logo} alt="Логотип"/>
        <p className="header__auth">
          email@email.com
          <span className="header__logout header__logout_visible">
            Выйти
          </span>
        </p>
      </div>
    </header>
  )
}

export default Header;