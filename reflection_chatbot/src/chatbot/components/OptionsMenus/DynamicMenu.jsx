import React, { useEffect, useState } from "react";
import GenericOptionsMenu from "../GenericOptionsMenu/GenericOptionsMenu";

const DynamicMenu = ({ menuOptions, actionProvider }) => {
  const [options, setOptions] = useState([]);
  useEffect(() => {
    if (menuOptions) {
    const newOptions = menuOptions.map((op, idx) => ({
      opText: op,
      opHandler: () => {
        actionProvider.handleMenuOption(op);
      },
      opId: idx,
    }));
    setOptions(newOptions);
  }
  }, [menuOptions]);
  return <GenericOptionsMenu options={options} />;
};

export default DynamicMenu;
