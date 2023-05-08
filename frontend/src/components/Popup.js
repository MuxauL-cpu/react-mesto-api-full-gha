import React, { useEffect } from "react";

function Popup({ name, isOpen, isClosed, children }) {
  useEffect(() => {
    function onKeyDown(evt) {
      if (evt.key === 'Escape') {
        isClosed();
      }
    }

    function handleOutsideClick(evt) {
      if (evt.target.classList.contains('popup_opened')) {
        isClosed();
      }
    };
  
    if (isOpen) {
      document.addEventListener('keydown', onKeyDown);
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('keydown', onKeyDown);
        document.removeEventListener('click', handleOutsideClick);
      }
    }
  }, [isOpen]);

  return(
    <section className={`popup popup_type_${name} ${isOpen && `popup_opened`}`}>
      <div className="popup__position">
        {children}
        <button type="button" aria-label="Закрыть" className="popup__button-close" onClick={isClosed}/>
      </div>
    </section>
  );
}

export default Popup;