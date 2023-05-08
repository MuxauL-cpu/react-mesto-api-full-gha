import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from '../utils/useFormValidation';

function EditAvatarPopup({ isOpen, isClosed, onUpdateAvatar, isLoading }) {
  const currentUser = useContext(CurrentUserContext);

  const { values, errors, onChange, resetForm } = useFormValidation();

  useEffect(() => {
    resetForm();
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();

    onUpdateAvatar(values);
  }

  return(
    <PopupWithForm
      name="avatar"
      header="Обновить аватар"
      buttonText={isLoading ? `Сохранение...` : 'Сохранить'}
      isOpen={isOpen}
      isClosed={isClosed}
      onSubmit={handleSubmit}
    >
      <>
        <input className="popup__input popup__input_type_avatar-link" 
        type="url" 
        placeholder="Ссылка на картинку" 
        name="avatar" 
        onChange={onChange}
        value={values.avatar || ''}
        required />
        <span className="popup__input-error">{errors.avatar || ''}</span>
      </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;