import React from "react";
import GenericOptionsMenu from "../GenericOptionsMenu/GenericOptionsMenu";
import Storage from "../../../user_util/StorageLog";

const StartMenu = (props) => {
  const options = [
    {
      opText: "Discuss AI Project",
      opHandler: () => {
        Storage.storeMessage(
          Date.now(),
          "User",
          props.actionProvider.stateRef.context.description,
          "Button: Discuss AI Project"
        );
        props.actionProvider.handleDesignJournal("button start");
      },
      opId: 1,
    },
    {
      opText: "Scratch programming help",
      opHandler: () => {
        Storage.storeMessage(
          Date.now(),
          "User",
          props.actionProvider.stateRef.context.description,
          "Button: Scratch programming help"
        );
        props.actionProvider.handleScratchCode("button start");
      },
      opId: 2,
    },
    {
      opText: "Learn about Jibo",
      opHandler: () => {
        Storage.storeMessage(
          Date.now(),
          "User",
          props.actionProvider.stateRef.context.description,
          "Button: Learn about Jibo"
        );
        props.actionProvider.handleJiboDiscussion("button start");
      },
      opId: 3,
    },
    {
      opText: "Learn about this tool",
      opHandler: () => {
        Storage.storeMessage(
          Date.now(),
          "User",
          props.actionProvider.stateRef.context.description,
          "Button: Learn about this tool"
        );
        props.actionProvider.handleHelp();
      },
      opId: 4,
    },
  ];

  return <GenericOptionsMenu options={options} />;
};

export default StartMenu;
