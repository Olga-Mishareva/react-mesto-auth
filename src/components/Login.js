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
      <div className={`popup__container popup__container_type_${name}`}>
        <form className="popup__form" noValidate name={name} action="#" method="post" id={name} onChange={isValid}>
          <h2 className={`popup__title popup__title_type_${name}`}>{title}</h2>
          <input className="popup__input popup__input_type_email" value={email || ''} type="email" required 
             name="email" placeholder="Email" onChange={handleEmail}/>
          <Validation errorMessage={errorMessage} name="username"/>   

          <input className="popup__input popup__input_type_password" value={password || ''} type="password" required minLength="8"
            maxLength="20" name="login" placeholder="Пароль" onChange={handlePassword}/>
          <Validation errorMessage={errorMessage} name="about"/>
          <button className={"popup__submit-button"} 
            type="submit" form={name}>{submitBtn}</button>
        </form>
      </div>
    // </div>
  )
}

export default Login;