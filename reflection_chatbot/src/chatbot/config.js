import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import GPT from "../gpt/GPTController";

import StartMenu from "./components/OptionsMenus/StartMenu.jsx";
import HelpMenu from "./components/OptionsMenus/HelpMenu.jsx";
import DesignJournalMenu from "./components/OptionsMenus/DesignJournalMenu.jsx";
import TutorialWidget from "./components/Tutorials/TutorialWidget.jsx";
import ScratchWidget from "./components/ScratchWidget.jsx"
import Contexts from "./BotContext";
/* Import additional widgets like so */
// import ExampleWidget from "./components/ExampleWidget.jsx"

const botName = "Sparki";

const apiKey = GPT.getApiKey();

let nameMsg = createChatBotMessage(
  `Hi, I'm ${botName}. A chatbot designed to help my users spark new ideas.`
);

let initialMsg;
if (apiKey) {
  console.log(`config Received API key ${apiKey}`);
  initialMsg = createChatBotMessage(`What would you like to do?`, {
    widget: "startMenu",
  });
} else {
  console.log(`config Didn't receive API key ${apiKey}`);
  initialMsg = createChatBotMessage(
    `To get started, can you enter an OpenAI API key?`
  );
}

const config = {
  botName: botName,
  // TODO initialize chatbot state as part of the config
  initialMessages: [nameMsg, initialMsg],
  state: {
    context: Contexts.Start,
    scratchCode: `say [Hello! I'm ${botName}]`
  },
  widgets: [
    {
      widgetName: "startMenu",
      widgetFunc: (props) => <StartMenu {...props} />,
    },
    {
      widgetName: "designJournalMenu",
      widgetFunc: (props) => <DesignJournalMenu {...props} />,
    },
    {
      widgetName: "helpMenu",
      widgetFunc: (props) => <HelpMenu {...props} />,
    },
    {
      widgetName: "tutorialExample",
      widgetFunc: (props) => <TutorialWidget {...props} />,
      props: {
        tutorialName: "exampleDeck"
      },
    },
    {
      widgetName: "displayScratchCode",
      widgetFunc: (props) => <ScratchWidget {...props} />,
      mapStateToProps: ['scratchCode'],
    },
    /* Add any additional widgets to this list
    {
      widgetName: "ExampleWidget",
      widgetFunc: (props) => <ExampleWidget {...props} />,
    }*/
  ],
};

export default config;
