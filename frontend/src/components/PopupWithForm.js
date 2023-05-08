import React from "react";
import Popup from "./Popup";
import Form from "./Form";

function PopupWithForm({ name, header, buttonText, isOpen, isClosed, onSubmit, children }) {
  
  return(
    <Popup 
      name={name} 
      isOpen={isOpen} 
      buttonText={buttonText} 
      isClosed={isClosed}
    >
      <Form 
        header={header} 
        name={name} 
        onSubmit={onSubmit} 
        children={children} 
        buttonText={buttonText} 
      />
    </Popup>
  );
}

export default PopupWithForm;