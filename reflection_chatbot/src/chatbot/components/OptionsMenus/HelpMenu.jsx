import React from "react";
import GenericOptionsMenu from "../GenericOptionsMenu/GenericOptionsMenu";

const HelpMenu = (props) => {
  const options = [
    {
      opText: "Help item 1",
      opHandler: () => {props.actionProvider.say("Help item 1")},
      opId: 1,
    },
  ];

  return <GenericOptionsMenu options={options} />;
};

export default HelpMenu;
