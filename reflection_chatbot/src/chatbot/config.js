import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import GPT from "../gpt/GPTController";
import Contexts from "./BotContext";

import StartMenu from "./components/OptionsMenus/StartMenu.jsx";
import DesignJournalMenu from "./components/OptionsMenus/DesignJournalMenu.jsx";
import TutorialWidget from "./components/Tutorials/TutorialWidget.jsx";
import ScratchWidget from "./components/ScratchWidget.jsx"
import ExampleWidget from "./components/ExampleWidget.jsx"
/* Import additional widgets like so */

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
  initialMessages: [nameMsg, initialMsg],
  state: {
    context: Contexts.Start,
    contextMessages: [],
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
      widgetName: "helpCards",
      widgetFunc: (props) => <TutorialWidget {...props} />,
      props: {
        tutorialName: "helpDeck"
      },
    },
    {
      widgetName: "displayScratchCode",
      widgetFunc: (props) => <ScratchWidget {...props} />,
      mapStateToProps: ['scratchCode'],
    },
    
    /** Add any additional widgets to this list */
    {
      widgetName: "exampleJiboWidget",
      widgetFunc: (props) => <ExampleWidget {...props} />,
    }
  ],
};

export default config;
