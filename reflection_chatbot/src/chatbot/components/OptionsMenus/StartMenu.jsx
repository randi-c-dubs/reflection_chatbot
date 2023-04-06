import React from "react";
import GenericOptionsMenu from "../GenericOptionsMenu/GenericOptionsMenu";

const StartMenu = (props) => {
  const options = [
    {
      opText: "Discuss AI Project",
      opHandler: () => {props.actionProvider.handleDesignJournal("button start")},
      opId: 1,
    },
    {
      opText: "Scratch programming help",
      opHandler: () => {props.actionProvider.handleScratchCode("button start")},
      opId: 2,
    },
    {
      opText: "Learn about Jibo",
      opHandler: () => {props.actionProvider.handleJiboDiscussion("button start")},
      opId: 3,
    },
    {
      opText: "Learn about this tool",
      opHandler: () => {props.actionProvider.handleHelp()},
      opId: 4,
    },
  ];

  return <GenericOptionsMenu options={options} />;
};

export default StartMenu;
