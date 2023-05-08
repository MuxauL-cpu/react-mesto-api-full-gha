import React from "react";
import Popup from "./Popup";

function InfoTooltip({ isOpen, isClosed, icon, alt, title }) {
    return(
      <Popup isOpen={isOpen} isClosed={isClosed} icon={icon} alt={alt} title={title}>
        <div className="popup__container">
          <div className="popup__form popup__form_infoTooltip">
            <img className="popup__status-icon" src={icon} alt={alt} />
            <h2 className="popup__header popup__header_infoTooltip">{title}</h2>
          </div>
        </div>
      </Popup>
  );
}

export default InfoTooltip;