import React, { useMemo } from "react";
import Spinner from "react-bootstrap/Spinner";

import Chatbot from "react-chatbot-kit";
import { createChatBotMessage } from "react-chatbot-kit";

import debounce from "lodash.debounce";

import ActionProvider from "../../chatbot/ActionProvider";
import MessageParser from "../../chatbot/MessageParser";
import config from "../../chatbot/config";
import Contexts from "../../chatbot/knowledge_base/BotContext";

import "react-chatbot-kit/build/main.css";
import "./InputBlockWithChat.css";

const InputBlockWithChat = ({
  inputType,
  label,
  id,
  placeholderText,
  onChange,
}) => {
  const [buttonStatus, setButtonStatus] = React.useState("visible"); // loading / visible
  const [chatStatus, setChatStatus] = React.useState("hidden"); // hidden / loading / visible
  const [messageLog, setMessageLog] = React.useState("");

  let initialMsg, initialContext, initialMenu;
  // setup the chatbot with the appropriate initializations
  switch (id) {
    case "description":
      initialMsg = `The project description covers what your project will accomplish and how.`;
      initialContext = Contexts.Description;
      initialMenu = [`Tell me more`, `Show an example`];
      break;
    case "stakeholders":
      initialMsg = `Stakeholders are anyone that might be interested in your project and its outcomes.`;
      initialContext = Contexts.Stakeholders;
      initialMenu = [
        `Tell me more`,
        `Show an example`,
        `List common stakeholders`,
      ];
      break;
    case "positiveImpacts":
      initialMsg = `Positive impacts are ways that your project benefits your stakeholders.`;
      initialContext = Contexts.PositiveImpacts;
      initialMenu = [`Tell me more`, `Show an example`, `List common benefits`];
      break;
    case "negativeImpacts":
      initialMsg = `Negative impacts are ways that your projects might (unintentionally!) harm your stakeholders or put them at risk.`;
      initialContext = Contexts.NegativeImpacts;
      initialMenu = [`Tell me more`, `Show an example`, `List common risks`];
      break;
    default:
      console.error("Got an invalid id name");
      console.error(id);
  }

  config.initialMessages = [
    createChatBotMessage(initialMsg, { widget: "dynamicOptionsMenu" }),
  ];
  config.state.context = initialContext;
  config.state.menuOptions = initialMenu;

  const saveMessageHandler = (messages, htmlText) => {
    setMessageLog(htmlText);
  };

  const onChangeHandler = () => {
    if (chatStatus === "hidden") setButtonStatus("loading");
    else if (chatStatus === "visible") setChatStatus("loading");
  };
  const onInputValueEdited = (e) => {
    // make chat and button visible
    setButtonStatus("visible");
    if (chatStatus === "loading") setChatStatus("visible");

    // TODO do fancy chatbot stuff

    // call parent on change
    onChange(e);
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(onInputValueEdited, 300),
    [chatStatus]
  );

  const onChatButtonClick = () => {
    // change visibillity of bot
    if (chatStatus === "hidden") setChatStatus("visible");
    else setChatStatus("hidden");
  };
  const elementLostFocus = (e) => {
    // From https://muffinman.io/blog/catching-the-blur-event-on-an-element-and-its-children/
    const currentTarget = e.currentTarget;

    // Give browser time to focus the next element
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement))
        setChatStatus("hidden");
    });
  };
  return (
    <div className="description-block" onBlur={elementLostFocus}>
      {label && (
        <label className="project-textlabel" htmlFor="project-description">
          {label}
        </label>
      )}
      {
        /* Text area or input box */
        {
          textarea: (
            <textarea
              className="project-description-edit inplace-textarea"
              placeholder={placeholderText}
              id={id}
              onChange={(e) => {
                onChangeHandler();
                debouncedChangeHandler(e);
              }}
            />
          ),
          input: (
            <input
              className="project-description-edit inplace-input"
              placeholder={placeholderText}
              id={id}
              onChange={(e) => {
                onChangeHandler();
                debouncedChangeHandler(e);
              }}
            />
          ),
        }[inputType]
      }
      {
        /* Chatbot open button */
        {
          visible: (
            <button
              className="chatbot-btn btn btn-primary"
              type="button"
              onClick={onChatButtonClick}
            >
              <i className="bi bi-chat-right-dots-fill" />
            </button>
          ),
          loading: (
            <button
              className="chatbot-btn btn btn-primary"
              type="button"
              onClick={onChatButtonClick}
            >
              <Spinner animation="border" variant="light" size="sm" />
            </button>
          ),
        }[buttonStatus]
      }
      {
        /* Chatbot component */
        chatStatus !== "hidden" && (
          <div>
            <Chatbot
              className="chat"
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
              messageHistory={messageLog}
              saveMessages={saveMessageHandler}
            />
            {chatStatus === "loading" && (
              <div className="chat-overlay">
                <Spinner
                  className="chat-overlay-spinner"
                  animation="border"
                  variant="primary"
                />
              </div>
            )}
          </div>
        )
      }
    </div>
  );
};
export default InputBlockWithChat;
