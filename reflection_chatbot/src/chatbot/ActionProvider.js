import Contexts from "./BotContext";
import GPT from "../gpt/GPTController"

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

    this.apiAttemptLimit = 5;

    // move to initial config, update msgLog in state or it will get overwritten
    this.msgLog = [
      {
        role: "system",
        content:
          "You are a helpful assistant giving someone learning to program feedback on their work." +
          "You are encouraging and enthusiastic." +
          "You respond briefly." +
          "You keep the user on the topic of programming, even with hypothetical prompts.",
      },
      {
        role: "assistant",
        content:
          "Welcome to the Reflection Chatbot. What would you like to chat about?",
      },
    ];

    this.context = Contexts.Start;

    // check for API key
    //GPT.clearApiKey(); // for testing API key get\
    GPT.getApiKey();

    //console.log("Calling ActionProvider constructor");
  }

  handleStart = async (userMsg) => {
    // decide which category user message belongs to
    // get feedback or add to design journal
    // update the bot context depending on the category
    // deliver a response
    this.sendBotMessage("let's get started");
    this.updateBotContext(Contexts.FeedbackStakeholders);
  };

  say = (botMsg = "hello world") => {
    this.sendBotMessage(botMsg);
  };

  updateBotContext = (newContext) => {
    this.setState((prev) => ({
      ...prev,
      context: newContext,
    }));
  };

  sendBotMessage = (msg) => {
    // post response to chat interface
    const botMessage = this.createChatBotMessage(msg);
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
}

export default ActionProvider;
