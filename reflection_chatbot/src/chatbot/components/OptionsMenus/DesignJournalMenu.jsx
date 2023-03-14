import React from "react";
import GenericOptionsMenu from "../GenericOptionsMenu/GenericOptionsMenu";

const DesignJournalMenu = (props) => {
  const options = [
    {
      opText: "Problem Definition",
      opHandler: () => {props.actionProvider.handleDesignJournal("problem def start")},
      opId: 1,
    },
    {
      opText: "Algorithm Design",
      opHandler: () => {props.actionProvider.handleDesignJournal("algo design start")},
      opId: 2,
    },
    {
      opText: "Project Deployment",
      opHandler: () => {props.actionProvider.handleDesignJournal("deployment start")},
      opId: 3,
    },
    {
      opText: "Project Reflection",
      opHandler: () => {props.actionProvider.handleDesignJournal("reflection start")},
      opId: 4,
    },
  ];

  return <GenericOptionsMenu options={options} />;
};

export default DesignJournalMenu;
