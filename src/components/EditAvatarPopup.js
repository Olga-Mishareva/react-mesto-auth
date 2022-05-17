import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import Validation from "./Validation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, loading, isValid, isActive, errorMessage, onSetForms }) {
  const [avatar, setAvatar] = useState('');

  function handleAvatar(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({ avatar });
    setAvatar('');
  }


  return (
    <PopupWithForm 
        title="Обновить аватар" name="edit-avatar" 
        onClose={onClose} isOpen={isOpen}
        isValid={isValid} isActive={isActive}
        submitBtn={loading ? 'Сохраниение...' : 'Сохранить'}
        onSubmit={handleSubmit} onSetForms={onSetForms}> 

        <input className="popup__input popup__input_type_avatar" value={avatar} type="url" required 
        name="avatar" placeholder="Ссылка на картинку" onChange={handleAvatar}/>
        <Validation errorMessage={errorMessage} name="avatar"/>
      </PopupWithForm>
  ) 
}

export default EditAvatarPopup;