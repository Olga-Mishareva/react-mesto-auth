import React from "react";

function InfoTooltip({ type, message }) {

  return (
    <div className={`tooltip tooltop_type_${type} tooltip_opened`}>
      <div className="tooltip__container">
      <button className="tooltip__close-button" type="button" ></button>
        <div className="tooltip__image"></div>
        <h2 className={`tooltip__message tooltip__message_type_${type}`}>{message}</h2>
    </div>
   </div>
  )
  
}

export default InfoTooltip;