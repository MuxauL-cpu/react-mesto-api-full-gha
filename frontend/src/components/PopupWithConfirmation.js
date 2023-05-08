import React from "react";
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({ isLoading, isOpen, isClosed, onSubmit }) {

  return(
    <PopupWithForm 
      name="card-delete"
      header="Вы уверены?"
      buttonText={isLoading ? `Удаление...` : `Да`}
      isOpen={isOpen}
      isClosed={isClosed}
      onSubmit={onSubmit}
    />
  );
}

export default PopupWithConfirmation;