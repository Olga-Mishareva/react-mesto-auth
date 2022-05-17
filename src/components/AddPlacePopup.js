import React, { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import Validation from "./Validation";

function AddPlacePopup({ onClose, isOpen, loading, isValid, isActive, errorMessage, onAddCard, onSetForms }) {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  function handleTitle(e) {
    setTitle(e.target.value);
  }
  function handleImage(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onAddCard({
      place: title,
      img: image
    });
    setTitle('');
    setImage('');
  }

  return (
    <PopupWithForm 
        title="Новое место" name="add-place" 
        onClose={onClose} isOpen={isOpen}
        isValid={isValid} isActive={isActive}
        submitBtn={loading ? 'Сохраниение...' : 'Создать'}
        onSubmit={handleSubmit} onSetForms={onSetForms}> 

        <input className="popup__input popup__input_type_place" value={title} type="text" required minLength="2"
          maxLength="40" name="place" placeholder="Название" onChange={handleTitle}/>
        <Validation errorMessage={errorMessage} name="place"/>

        <input className="popup__input popup__input_type_img" value={image} type="url" required name="img"
          placeholder="Ссылка на картинку" onChange={handleImage}/>
        <Validation errorMessage={errorMessage} name="img"/>
      </PopupWithForm>
  )
}

export default AddPlacePopup;