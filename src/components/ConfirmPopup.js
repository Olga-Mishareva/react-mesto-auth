import PopupWithForm from "./PopupWithForm";

function ConfirmPopup({ card, isOpen, onClose, onDeleteCard, loading, onSetForms }) {

  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard(card);
  }


  return (
    <PopupWithForm 
      title="Вы уверены?" name="delete-place" 
      submitBtn={loading ? 'Удаление...' : 'Да'}
      onClose={onClose} isOpen={isOpen}
      onSubmit={handleSubmit} onSetForms={onSetForms}/>
  )
}

export default ConfirmPopup;