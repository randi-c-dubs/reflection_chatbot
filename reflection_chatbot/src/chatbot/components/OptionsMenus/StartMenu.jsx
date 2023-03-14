import React from "react";
import GenericOptionsMenu from "../GenericOptionsMenu/GenericOptionsMenu";

const StartMenu = (props) => {
  const options = [
    {
      opText: "Add to design journal",
      opHandler: () => {props.actionProvider.handleDesignJournal("start")},
      opId: 1,
    },
    {
      opText: "Get help",
      opHandler: () => {props.actionProvider.handleHelp("start")},
      opId: 2,
    },
    {
      opText: "Get feedback",
      opHandler: () => {props.actionProvider.handleFeedback("start")},
      opId: 3,
    },
  ];

  return <GenericOptionsMenu options={options} />;
};

export default StartMenu;
