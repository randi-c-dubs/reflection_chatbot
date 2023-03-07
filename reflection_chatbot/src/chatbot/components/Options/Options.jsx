import React from "react";

import "./Options.css";

const Options = ({ options }) => {
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

export default Options;
