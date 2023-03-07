import React from "react";
import Options from "./Options/Options";

const StartMenuOptions = (props) => {
  const options = [
    {
      opText: "Add to design journal",
      opHandler: () => {props.actionProvider.say("design journal")},
      opId: 1,
    },
    {
      opText: "Get help",
      opHandler: () => {props.actionProvider.say("get help")},
      opId: 2,
    },
    {
      opText: "Get feedback",
      opHandler: () => {props.actionProvider.say("get feedback")},
      opId: 3,
    },
  ];

  return <Options options={options} />;
};

export default StartMenuOptions;
