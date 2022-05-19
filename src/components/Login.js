import React, { useState, useEffect } from "react";
import Validation from "./Validation";

function Login({ name, title, isValid, submitBtn, errorMessage }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }


  return (
    // <div className={`popup popup_type_${name}`}>
      <div className={`auth__container auth__container_type_${name}`}>
        <form className="auth__form" noValidate name={name} action="#" method="post" id={name} onChange={isValid}>
          <h2 className={`auth__title auth__title_type_${name}`}>{title}</h2>
          <input className="auth__input auth__input_type_email" value={email || ''} type="email" required 
             name="email" placeholder="Email" onChange={handleEmail}/>
          <Validation errorMessage={errorMessage} name="email"/>   

          <input className="auth__input auth__input_type_password" value={password || ''} type="password" required minLength="8"
            maxLength="20" name="password" placeholder="Пароль" onChange={handlePassword}/>
          <Validation errorMessage={errorMessage} name="password"/>
          <button className={"auth__submit-button"} 
            type="submit" form={name}>{submitBtn}</button>
          <p className="auth__login-offer auth__login-offer_visible">Уже зарегистрированы? Войти</p>
        </form>
      </div>
    // </div>
  )
}

export default Login;