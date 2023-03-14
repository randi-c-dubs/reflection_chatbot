//import BotContext from "./BotContext";
//import GPT from "./GPTController"

// The MessageParse class analyzes words sent to the chatbot and calls the appropriate ActionProvider function
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(userMsg) {
    //console.log(`message parser ${userMsg}`); // for testing message parser
    console.log(
      `Action Provider context: ${this.actionProvider.context.description}`
    );
    if (!this.actionProvider.context) {
      console.log("Start state");
    } else {
      this.actionProvider.handleStart(userMsg);
    }
  }
}

export default MessageParser;
