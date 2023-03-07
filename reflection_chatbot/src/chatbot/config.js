import React from "react";
import { createChatBotMessage } from "react-chatbot-kit";

import StartMenuOptions from "./components/StartMenuOptions.jsx";

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
      widgetFunc: (props) => <StartMenuOptions {...props} />,
    },
  ],
};

export default config;
