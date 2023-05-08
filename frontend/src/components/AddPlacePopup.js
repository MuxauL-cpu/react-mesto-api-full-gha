import { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm";
import useFormValidation from '../utils/useFormValidation';

function AddPlacePopup({ isLoading, isOpen, isClosed, onAddCard }) {
  const { values, errors, onChange, resetForm } = useFormValidation();

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddCard(values);
  }

  useEffect(() => {
    resetForm();
  }, [isOpen])

  return(
    <PopupWithForm 
      name="card-editor"
      header="Новое место"
      buttonText={isLoading ? `Создание...` : `Создать`}
      isOpen={isOpen}
      isClosed={isClosed}
      onSubmit={handleSubmit}
    >
      <input 
        className="popup__input popup__input_type_name" 
        placeholder="Название" 
        name="name" 
        minLength="2" 
        maxLength="40" 
        onChange={onChange} 
        value={values.name || ''}
        required 
      />
      <span className="popup__input-error">{errors.name || ''}</span>
      <input 
        className="popup__input popup__input_type_url" 
        placeholder="URL" 
        name="link" 
        type="url"
        minLength="2" 
        maxLength="200" 
        onChange={onChange} 
        value={values.link || ''}
        required 
      />
      <span className="popup__input-error">{errors.link || ''}</span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;