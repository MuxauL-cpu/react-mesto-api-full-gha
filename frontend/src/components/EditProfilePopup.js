import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from '../utils/useFormValidation';

function EditProfilePopup({ isOpen, isClosed, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, onChange, resetForm } = useFormValidation();

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser);
    }
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateUser(values);
  }

  return(
    <PopupWithForm 
      name="user"
      header="Редактировать профиль"
      buttonText={isLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      isClosed={isClosed}
      onSubmit={handleSubmit}
    >
      <input 
        className="popup__input popup__input_type_name" 
        placeholder="Имя" 
        name="name" 
        minLength="2" 
        maxLength="40" 
        onChange={onChange} 
        value={values.name || ''}
        required />
      <span className="popup__input-error">{errors.name || ''}</span>
      <input 
        className="popup__input popup__input_type_job"
        placeholder="О себе"
        name="about"
        minLength="2"
        maxLength="200"
        onChange={onChange}
        value={values.about || ''}
        required />
      <span className="popup__input-error">{errors.about || ''}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;