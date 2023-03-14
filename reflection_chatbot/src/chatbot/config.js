import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import GPT from "../gpt/GPTController";

import StartMenu from "./components/OptionsMenus/StartMenu.jsx";
import HelpMenu from "./components/OptionsMenus/HelpMenu.jsx";
import DesignJournalMenu from "./components/OptionsMenus/DesignJournalMenu.jsx";

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
  // TODO initialize a GPT controller a part of the config and chatbot state
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
  ],
};

export default config;
