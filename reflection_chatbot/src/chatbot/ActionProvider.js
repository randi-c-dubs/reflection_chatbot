import Contexts from "./BotContext";
import GPT from "../gpt/GPTController";

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

  /**  Design Journal Actions   **/
  handleDesignJournal = async (func) => {
    if (func === "start") {
      this.updateBotContext(Contexts.DesignStart);

      let prompt = `prompt: Rephrase the following in your own voice: "It looks like you're just getting started with your design journal. Which part would you like to work on?"`;
      // TODO have GPT rephrase message
      let resp = prompt;
      this.sendBotMessage(
        this.createChatBotMessage(resp, { widget: "designJournalMenu" })
      );
    } else {
      this.sendBotMessage(
        this.createChatBotMessage(`Design Journal ${func}`)
      );
    }
  };

  /**  Help Actions  **/
  handleHelp = async (func) => {
    if (func === "start") {
    this.updateBotContext(Contexts.HelpStart);

    let prompt = `prompt: Rephrase the following in your own voice: "What can I help you with?"`;
    // TODO have GPT rephrase message
    let resp = prompt;
    this.sendBotMessage(
      this.createChatBotMessage(resp, { widget: "helpMenu" })
    );
    } else {
      this.sendBotMessage(
        this.createChatBotMessage(`Help ${func}`)
      );
    }
  };

  /**  Feedback Actions  **/
  handleFeedback = async (func) => {
    if (func === "start") {
    this.updateBotContext(Contexts.FeedbackStart);

    // TODO save state of design journal and use it to populate feedback options
    let prompt = `prompt: Rephrase the following in your own voice: "I'd be happy to give you feedback. From what I see in your design journal, we can talk about X, Y, or Z?"`;
    // TODO have GPT rephrase message
    let resp = prompt;
    this.sendBotMessage(
      this.createChatBotMessage(resp)
    )
    } else {
      this.sendBotMessage(
        this.createChatBotMessage(`Feedback ${func}`)
      );
    }
  };

  say = (botMsg = "hello world") => {
    this.sendBotMessage(
      this.createChatBotMessage(botMsg)
    );
  };

  updateBotContext = (newContext) => {
    this.setState((prev) => ({
      ...prev,
      context: newContext,
    }));
  };

  sendBotMessage = (botMessage) => {
    // post response to chat interface
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
}

export default ActionProvider;
