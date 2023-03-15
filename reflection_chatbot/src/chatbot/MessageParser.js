//import GPT from "../gpt/GPTController";
import Contexts from "./BotContext";

// The MessageParse class analyzes words sent to the chatbot and calls the appropriate ActionProvider function
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(userMsg) {
    let context = this.actionProvider.stateRef.context ? this.actionProvider.stateRef.context : Contexts.Start;

    //console.log(`Message Parser ${userMsg}`); // debug message
    //console.log(`Message Parser context: ${context.description}`); // debug mesage

    // handle receiving API key
    if (userMsg.startsWith("sk-")) {
      this.actionProvider.handleApiKey(userMsg);
    }
    // handle starting chatbot
    else if (
      context === Contexts.Start
    ) {
      this.actionProvider.handleStart(userMsg);
    } 
    // handle requesting API key
    else if (context === Contexts.RequestApiKey) {
      this.actionProvider.requestApiKey();
    }
    /** Parse the user input by adding to this else-if list.
     * Call the appropriate actionProvider function here
    else if (userMsg.includes("Jibo")) {
      this.actionProvider.exampleHandler(userMsg);
    }*/
    else {
      //console.log(`message parser ${userMsg}`); // for testing message parser
    }
  }
}

export default MessageParser;
