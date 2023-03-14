import React from "react";

import "./GenericOptionsMenu.css";

const GenericOptionsMenu = ({ options }) => {
  const buttonsMarkup = options.map((option) => (
    <button
      key={option.opId}
      onClick={option.opHandler}
      className="option-button"
    >
      {option.opText}
    </button>
  ));

  return <div className="options-container">{buttonsMarkup}</div>;
};

export default GenericOptionsMenu;
