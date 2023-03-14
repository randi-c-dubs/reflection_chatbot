//import GPT from "../gpt/GPTController";
import Contexts from "./BotContext";

// The MessageParse class analyzes words sent to the chatbot and calls the appropriate ActionProvider function
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(userMsg) {
    // TODO make sure we're pulling the state from the right place. Seems to be resetting


    //console.log(`message parser ${userMsg}`); // for testing message parser
    console.log(`Message Parser context: ${this.actionProvider.context}`);
    console.log(userMsg);

    // handle receiving API key
    if (userMsg.startsWith("sk-")) {
      this.actionProvider.handleApiKey(userMsg);
    }
    // handle starting chatbot
    else if (
      !this.actionProvider.context ||
      this.actionProvider.context === Contexts.Start
    ) {
      console.log("Start state");
      this.actionProvider.handleStart(userMsg);
    } 
    // handle requesting API key
    else if (this.actionProvider.context === Contexts.RequestApiKey) {
      this.actionProvider.requestApiKey();
    }
    else {
      //console.log(`message parser ${userMsg}`); // for testing message parser
    }
  }
}

export default MessageParser;
