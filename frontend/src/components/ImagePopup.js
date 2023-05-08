import React from "react";
import Popup from "./Popup";

function ImagePopup({ isOpen, card, isClosed }) {
  return(
    <Popup name='open-image' isOpen={isOpen} isClosed={isClosed}>
      <figure className="popup__figure">
        
        <img src={card.link} alt={card.name} className="popup__image" />
        <figcaption className="popup__figcaption">{card.name}</figcaption>
      </figure>
    </Popup>
    
  )
}

export default ImagePopup;