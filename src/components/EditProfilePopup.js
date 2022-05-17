import React, { useEffect, useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import Validation from "./Validation";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, loading, isValid, isActive, errorMessage, onSetForms }) {
  const [name, setName] = useState(''); 
  const [description, setDescription] = useState('');
  const currentUser = React.useContext(CurrentUserContext);

  function handleName(e) {
    setName(e.target.value);
  }
  function handleDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({
      username: name,
      about: description
    })
  }

  useEffect(() => {
    setName(currentUser.userName);
    setDescription(currentUser.userInfo);
  }, [currentUser, isOpen]);


  return (
    <PopupWithForm 
        title="Редактировать профиль" name="edit-profile" 
        onClose={onClose} isOpen={isOpen}
        isValid={isValid} isActive={isActive}
        submitBtn={loading ? 'Сохраниение...' : 'Сохранить'} 
        onSubmit={handleSubmit} onSetForms={onSetForms}>

        <input className="popup__input popup__input_type_username" value={name || ''} type="text" required minLength="2" maxLength="40"
          name="username" placeholder="Имя" onChange={handleName}/>
        <Validation errorMessage={errorMessage} name="username"/>   

        <input className="popup__input popup__input_type_about" value={description || ''} type="text" required minLength="2"
          maxLength="200" name="about" placeholder="О себе" onChange={handleDescription}/>
        <Validation errorMessage={errorMessage} name="about"/>
      </PopupWithForm>
  )
}

export default EditProfilePopup;