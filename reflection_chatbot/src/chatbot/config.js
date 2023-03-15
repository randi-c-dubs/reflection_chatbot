import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import GPT from "../gpt/GPTController";

import StartMenu from "./components/OptionsMenus/StartMenu.jsx";
import HelpMenu from "./components/OptionsMenus/HelpMenu.jsx";
import DesignJournalMenu from "./components/OptionsMenus/DesignJournalMenu.jsx";
/* Import additional widgets like so */
// import ExampleWidget from "./components/JiboWidget.jsx"

const botName = "Reflection Chatbot";

const apiKey = GPT.getApiKey();

let initialMsg;
if (apiKey) {
  console.log(`config Received API key ${apiKey}`);
  initialMsg = createChatBotMessage(
    `Hi, I'm ${botName}. What would you like to do?`,
    {
      widget: "startMenu",
    }
  );
} else {
  console.log(`config Didn't receive API key ${apiKey}`);
  initialMsg = createChatBotMessage(
    `Hi, I'm ${botName}. To get started, can you enter an OpenAI API key?`
  );
}

const config = {
  botName: botName,
  // TODO initialize chatbot state as part of the config 
  initialMessages: [initialMsg],
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
    /* Add any additional widgets to this list
    {
      widgetName: "ExampleWidget",
      widgetFunc: (props) => <ExampleWidget {...props} />,
    }*/
  ],
};

export default config;
