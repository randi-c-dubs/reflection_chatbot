import React from "react";
import Spinner from "react-bootstrap/Spinner";

import Chatbot from "react-chatbot-kit";
import { createChatBotMessage } from "react-chatbot-kit";

import ActionProvider from "../../chatbot/ActionProvider";
import MessageParser from "../../chatbot/MessageParser";
import config from "../../chatbot/config";
import Contexts from "../../chatbot/BotContext";

import "react-chatbot-kit/build/main.css";
import "./InputBlockWithChat.css";

const InputBlockWithChat = ({
  inputtype,
  label,
  id,
  placeholderText,
  onBlur,
  onChange,
}) => {
  const [buttonStatus, setButtonStatus] = React.useState("visible"); // hidden / loading / visible
  //const [messageRead, setMessageRead] = React.useState(true);
  const [botVisible, setBotVisible] = React.useState(false);

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
      initialMenu = [`Tell me more`, `Show an example`,`List common stakeholders`];
      break;
    case "positiveImpacts":
      initialMsg = `Positive impacts are ways that your project benefits your stakeholders.`;
      initialContext = Contexts.PositiveImpacts;
      initialMenu = [`Tell me more`, `Show an example`,`List common benefits`];
      break;
    case "negativeImpacts":
      initialMsg = `Negative impacts are ways that your projects might (unintentionally!) harm your staekholders or put them at risk.`;
      initialContext = Contexts.NegativeImpacts;
      initialMenu = [`Tell me more`, `Show an example`,`List common risks`];
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

  // TODO make this a debounced onchange instead
  const onBlurHandle = (e) => {
    // set visibility of button based on whether the item is filled or not
    console.log("on blur handle");
    console.log(e.target.id + ": " + e.target.value);

    // make button visible
    if (e.target.value) {
      setButtonStatus("visible");

      // TODO chatbot stuff
    }

    // call parent on blur to handle data
    onBlur(e.target.id, e.target.value);
  };
  const onChangeHandle = (e) => {
    setButtonStatus("loading");

    // call parent on change
    onChange(e);
  };
  const botButtonHandler = () => {
    // toggle visibillity of bot
    setBotVisible(!botVisible);
  };
  const elementLostFocus = (e) => {
    // From https://muffinman.io/blog/catching-the-blur-event-on-an-element-and-its-children/
    const currentTarget = e.currentTarget;

    // Give browser time to focus the next element
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement)) {
        setBotVisible(false);
      }
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
              onBlur={onBlurHandle}
              onChange={onChangeHandle}
            />
          ),
          input: (
            <input
              className="project-description-edit inplace-input"
              placeholder={placeholderText}
              id={id}
              onBlur={onBlurHandle}
              onChange={onChangeHandle}
            />
          ),
        }[inputtype]
      }
      {
        /* Chatbot open button */
        {
          visible: (
            <button
              className="chatbot-btn btn btn-primary"
              type="button"
              onClick={botButtonHandler}
            >
              <i className="bi bi-chat-right-dots-fill" />
            </button>
          ),
          loading: (
            <button
              className="chatbot-btn btn btn-primary"
              type="button"
              onClick={botButtonHandler}
            >
              <Spinner animation="border" variant="light" size="sm" />
            </button>
          ),
        }[buttonStatus]
      }
      {
        /* Chatbot component */
        <div style={{ display: botVisible ? "block" : "none" }}>
          <Chatbot
            config={config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
          />
        </div>
      }
    </div>
  );
};
export default InputBlockWithChat;
