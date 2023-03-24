import Contexts from "./BotContext";
import GPT from "../gpt/GPTController";

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
    this.updateBotContext(Contexts.Start);
    let prompt = `${rephraseHeader} "I can only help with a few specific things. What would you like to do?"`;
    let resp = await GPT.getGPTResponse(prompt);
    this.sayAndShowWidget(resp, { widget: "startMenu" });
  };

  requestApiKey = async () => {
    this.updateBotContext(Contexts.RequestApiKey);
    this.say(`Please enter a vaid API key from OpenAI.`);
  };

  handleApiKey = async (userMsg) => {
    console.log(`Action Provider handle API key`);
    GPT.setApiKey(userMsg);
    
    let prompt = `${rephraseHeader} "This API key worked."`
    let resp = await GPT.getGPTResponse(prompt);
    if (!resp) {
      this.requestApiKey();
    } else {
      this.say(resp);
      this.handleStart();
    }
  };

  /**  Design Journal Actions   **/
  handleDesignJournal = async (func) => {
    if (func === "start") {
      this.updateBotContext(Contexts.DesignStart);

      // TODO save state of design journal and use it to personalize response
      let prompt = `${rephraseHeader} "It looks like you're just getting started with your design journal. Which part would you like to work on?"`;
      let resp = await GPT.getGPTResponse(prompt);
      this.sayAndShowWidget(resp, { widget: "designJournalMenu" });
    } else {
      this.say(`Design Journal ${func}`);
    }
  };

  /**  Help Actions  **/
  handleHelp = async (func) => {
    if (func === "start") {
      this.updateBotContext(Contexts.HelpStart);

      let prompt = `${rephraseHeader} "What can I help you with?"`;
      let resp = await GPT.getGPTResponse(prompt);
      this.sayAndShowWidget(
        resp, { widget: "tutorialExample" }
      );
    } else {
      this.say(`Help ${func}`);
    }
  };

  /**  Feedback Actions  **/
  handleFeedback = async (func) => {
    if (func === "start") {
      this.updateBotContext(Contexts.FeedbackStart);

      // TODO save state of design journal and use it to populate feedback options
      let prompt = `${rephraseHeader} "I'd be happy to give you feedback. From what I see in your design journal, we can talk about X, Y, or Z?"`;
      let resp = await GPT.getGPTResponse(prompt);
      this.say(resp);
    } else {
      this.say(`Feedback ${func}`);
    }
  };

  /** Create additional actions for the chatbot here **/
  exampleHandler = async (message) => {
    // Use prompts to give instructions to GPT 
    let prompt = `Answer this question about Jibo, an awesome social robot with the personality of a 10-year-old who loves penguins and the color blue: ${message}`;
    // Call GPT.getGPTResponse to get response from GPT
    let resp = await GPT.getGPTResponse(prompt);

    // Use "say" or "sayAndShowWidget" functions to have the chatbot reply
    this.sayAndShowWidget(resp, { widget: "ExampleWidget" });
  }

  /**  Chatbot utility funcions **/

  say = (botMsg = "hello world") => {
    this.sendBotMessage(this.createChatBotMessage(botMsg));
  };

  sayAndShowWidget = (botMsg = "hello world", widget) => {
    this.sendBotMessage(this.createChatBotMessage(botMsg, widget));
  }

  updateBotContext = (newContext) => {
    this.setState((prev) => ({
      ...prev,
      context: newContext,
    }));
  };

  sendBotMessage = (botMessage) => {
    //console.log(this.stateRef); // debug message

    // post response to chat interface
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
}

export default ActionProvider;
