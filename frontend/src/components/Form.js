import React from "react";

function Form({ children, name, onSubmit, buttonText, header }) {
  return(
    <div className="popup__container">
      <h2 className="popup__header">{header}</h2>
      <form className="popup__form" name={name} onSubmit={onSubmit}>
        {children}
        <button type="submit" className={`popup__button-submit popup__button-submit_type_${name}`}>{buttonText}</button>
      </form>
    </div>
  );
}

export default Form;