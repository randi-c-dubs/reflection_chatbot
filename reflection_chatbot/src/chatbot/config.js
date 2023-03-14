import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import StartMenu from "./components/OptionsMenus/StartMenu.jsx";
import HelpMenu from "./components/OptionsMenus/HelpMenu.jsx";
import DesignJournalMenu from "./components/OptionsMenus/DesignJournalMenu.jsx";

const botName = "Reflection Chatbot";

const config = {
  botName: botName,
  // TODO initialize a GPT controller a part of the config and chatbot state
  initialMessages: [
    createChatBotMessage(
      `Hi, I'm ${botName}. What would you like to do?`,
      {
        widget: "startMenu",
      }
    ),
  ],
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
