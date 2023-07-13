//import GPT from "../gpt/GPTController";
import Contexts from "./resources/BotContext";
import Storage from "../user_util/StorageLog";

// The MessageParse class analyzes words sent to the chatbot and calls the appropriate ActionProvider function
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(userMsg) {
    let context = this.state.context ? this.state.context : Contexts.Start;

    // Store timestamp, user message, and context
    Storage.storeMessage(Date.now(), "User", context.description, userMsg);

    //console.log(`Message Parser ${userMsg}`); // debug message
    //console.log(`Message Parser context: ${context.description}`); // debug message

    // handle receiving API key
    if (userMsg.startsWith("sparki-")) {
      this.actionProvider.handleSecretKey(userMsg);
    } else if (userMsg.startsWith("sk-")) {
      this.actionProvider.handleAPIKey(userMsg);
    }
    // handle requesting API key
    else if (context === Contexts.RequestSecretKey) {
      this.actionProvider.requestSecretKey();
    }
    // TODO check for user typing text that button says
    else {
      /** Parse the user input by adding to this else-if list.
       * Call the appropriate actionProvider function here
       */
      //console.log(`Ended up in message parser else ${userMsg}`); // for testing message parser
      await this.actionProvider.handleUserMessage(userMsg);
    }
  }
}

export default MessageParser;
