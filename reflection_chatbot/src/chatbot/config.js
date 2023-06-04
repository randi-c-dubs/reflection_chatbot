import React from "react";

import DynamicMenu from "./components/OptionsMenus/DynamicMenu.jsx"
import InlineTutorialWidget from "./components/Tutorials/InlineTutorialWidget.jsx";
//import TutorialWidget from "./components/Tutorials/TutorialWidget.jsx";

const botName = "Sparki";

const config = {
  botName: botName,
  state: {
    contextMessages: [],
  },
  widgets: [
    // TODO important cards for stakeholders, benefits, risks, etc.
    {
      widgetName: "helpCards",
      widgetFunc: (props) => <InlineTutorialWidget {...props} />,
      props: {
        tutorialName: "helpDeck",
      },
    },
    {
      widgetName: "dynamicOptionsMenu",
      widgetFunc: (props) => <DynamicMenu {...props} />,
      mapStateToProps: ["menuOptions"],
    }

    /** Add any additional widgets to this list */
  ],
};

export default config;
