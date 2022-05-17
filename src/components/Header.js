import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <img className="logo" src={logo} alt="Логотип"/>
      </div>
    </header>
  )
}

export default Header;