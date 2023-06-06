import Contexts from "./resources/BotContext";
import GPT from "../gpt/GPTController";
import Storage from "../user_util/StorageLog";
import Accounts from "../user_util/Accounts";
import KnowledgeBase from "./resources/KnowledgeBase";

const rephraseHeader = "Rephrase the following in your own voice:";

// The ActionProvider class controls what the chatbot does and responds
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;

    //console.log("Calling ActionProvider constructor"); // debug message
  }

  handleStart = async () => {
    this.updateContext(Contexts.Start);
    let prompt = `${rephraseHeader} "What would you like to do? I can help with a few specific things."`;
    let resp = await GPT.getGPTResponse(prompt);
    this.sayAndShowWidget(resp, { widget: "startMenu" });
  };

  requestSecretKey = async () => {
    this.updateContext(Contexts.RequestSecretKey);
    this.say(
      `Please enter a valid secret key or OpenAI API key to use Sparki.`
    );
  };
  handleSecretKey = async (userMsg) => {
    await Accounts.setSecretKey(userMsg);

    // test the key to see if it works
    let prompt = `${rephraseHeader} "Thank you for the valid key."`;
    let resp = await GPT.getGPTResponse(prompt);
    if (!resp) {
      this.requestSecretKey();
    } else {
      this.say(resp);
      this.handleStart();
    }
  };
  handleAPIKey = async (userMsg) => {
    GPT.setApiKey(userMsg, true);

    // test the key to see if it works
    let prompt = `${rephraseHeader} "Thank you for the valid key."`;
    let resp = await GPT.getGPTResponse(prompt);
    if (!resp) {
      this.requestSecretKey();
    } else {
      this.say(resp);
      this.handleStart();
    }
  };
  handleRandomUserMessage = async (userMsg) => {
    let prompt = `userMsg`;
    let resp = await GPT.getGPTResponse(prompt);
    this.say(resp);
  };

  /**  AI Design Actions   **/
  handleMenuOption = async (userChoice) => {
    switch (this.stateRef.context) {
      case Contexts.Description:
        this.handleDescription(userChoice);
        break;
      case Contexts.Stakeholders:
        this.handleStakeholders(userChoice);
        break;
      case Contexts.NegativeImpacts:
        this.handleNegativeImpacts(userChoice);
        break;
      case Contexts.PositiveImpacts:
        this.handlePositiveImpacts(userChoice);
        break;
      default:
        console.error("Ended up in an unknown state");
        console.error(this.stateRef.context);
        break;
    }
  };
  handleDescription = async (userChoice) => {
    // Remove the option from the menu
    this.removeMenuOption(userChoice);

    // Have chatbot say the content
    let resp = KnowledgeBase["description"].content[userChoice];
    if (Array.isArray(resp)) {
      for (let i = 0; i < resp.length - 1; i++) {
        this.say(resp[i]);
      }
      this.sayAndShowWidget(resp[resp.length - 1], {
        widget: "dynamicOptionsMenu",
      });
    } else {
      this.sayAndShowWidget(resp, { widget: "dynamicOptionsMenu" });
    }

    // TODO For some choices, add additional items to menu
  };
  handleStakeholders = async (userChoice) => {
    // Remove the option from the menu
    this.removeMenuOption(userChoice);

    // Have chatbot say the content
    let resp = KnowledgeBase["stakeholders"].content[userChoice];
    if (Array.isArray(resp)) {
      for (let i = 0; i < resp.length - 1; i++) {
        this.say(resp[i]);
      }
      this.sayAndShowWidget(resp[resp.length - 1], {
        widget: "dynamicOptionsMenu",
      });
    } else {
      this.sayAndShowWidget(resp, { widget: "dynamicOptionsMenu" });
    }

    // TODO For some choices, add additional items to menu
  };
  handlePositiveImpacts = async (userChoice) => {
    // Remove the option from the menu
    this.removeMenuOption(userChoice);

    // Have chatbot say the content
    let resp = KnowledgeBase["positiveImpacts"].content[userChoice];
    if (Array.isArray(resp)) {
      for (let i = 0; i < resp.length - 1; i++) {
        this.say(resp[i]);
      }
      this.sayAndShowWidget(resp[resp.length - 1], {
        widget: "dynamicOptionsMenu",
      });
    } else {
      this.sayAndShowWidget(resp, { widget: "dynamicOptionsMenu" });
    }

    // TODO For some choices, add additional items to menu
  };
  handleNegativeImpacts = async (userChoice) => {
    // Remove the option from the menu
    this.removeMenuOption(userChoice);

    // Have chatbot say the content
    let resp = KnowledgeBase["negativeImpacts"].content[userChoice];
    if (Array.isArray(resp)) {
      for (let i = 0; i < resp.length - 1; i++) {
        this.say(resp[i]);
      }
      this.sayAndShowWidget(resp[resp.length - 1], {
        widget: "dynamicOptionsMenu",
      });
    } else {
      this.sayAndShowWidget(resp, { widget: "dynamicOptionsMenu" });
    }

    // TODO For some choices, add additional items to menu
  };
  handleBotInput = async (userMsg) => {};

  /**  Chatbot utility funcions **/
  addMenuOptions = (newOptions) => {
    // add new options to existing options
    let menuOptions = this.stateRef.menuOptions.concat(newOptions);
    this.setMenuOptions(menuOptions);
  };
  removeMenuOption = (option) => {
    // remove options
    let menuOptions = this.stateRef.menuOptions.filter((e) => {
      return e.content !== option;
    });
    this.setMenuOptions(menuOptions);
  };
  setMenuOptions = (options) => {
    // update menu options to tell widget what option buttons to display
    this.setState((prev) => ({
      ...prev,
      menuOptions: options,
    }));
  };

  setScratchCode = (code = "say [Hello world!]") => {
    // update scratchCode in state to tell widget what code to display
    this.setState((prev) => ({
      ...prev,
      scratchCode: code,
    }));
  };

  updateContext = (newContext) => {
    if (this.stateRef.context !== newContext) {
      console.log(`Changing context to ${newContext.description}`); // debug message

      // Change the context of the chat and reset contextMessages
      this.setState((prev) => ({
        ...prev,
        context: newContext,
        contextMessages: [],
      }));
    }
  };
  updateContextMessages = (userMsg) => {
    this.setState((prev) => ({
      ...prev,
      contextMessages: [...prev.contextMessages, userMsg],
    }));
  };

  say = (botMsg = "hello world") => {
    this.sendBotMessage(this.createChatBotMessage(botMsg));
  };
  sayAndShowWidget = (botMsg = "hello world", widget) => {
    this.sendBotMessage(this.createChatBotMessage(botMsg, widget));
  };
  sendBotMessage = (botMsg) => {
    // Store timestamp, bot message, and context
    // TODO decide what to do about widgets
    Storage.storeMessage(
      Date.now(),
      "Sparki",
      this.stateRef.context.description,
      botMsg.message
    );
    //console.log(this.stateRef); // debug message

    // post response to chat interface and add to contextMessages
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMsg],
      contextMessages: [...prev.contextMessages, botMsg],
    }));
  };
}

export default ActionProvider;
