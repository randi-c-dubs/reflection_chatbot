import React, { useEffect, useState } from "react";
import GenericOptionsMenu from "../GenericOptionsMenu/GenericOptionsMenu";

const DynamicMenu = ({ menuOptions, actionProvider }) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (menuOptions) {
    const newOptions = menuOptions.map((op, idx) => ({
      opText: op.text,
      opHandler: () => {
        actionProvider.handleMenuOption(op.content);
      },
      opId: idx,
    }));
    setOptions(newOptions);
  }
  }, []);
  return <GenericOptionsMenu options={options} />;
};

export default DynamicMenu;
