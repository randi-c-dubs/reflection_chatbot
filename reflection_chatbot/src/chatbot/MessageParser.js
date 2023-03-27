import GPT from "../gpt/GPTController";
import Contexts from "./BotContext";

// The MessageParse class analyzes words sent to the chatbot and calls the appropriate ActionProvider function
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(userMsg) {
    let context = this.actionProvider.stateRef.context
      ? this.actionProvider.stateRef.context
      : Contexts.Start;

    //console.log(`Message Parser ${userMsg}`); // debug message
    //console.log(`Message Parser context: ${context.description}`); // debug message

    // handle receiving API key
    if (userMsg.startsWith("sk-")) {
      this.actionProvider.handleApiKey(userMsg);
    }
    // handle requesting API key
    else if (context === Contexts.RequestApiKey) {
      this.actionProvider.requestApiKey();
    }
    // handle starting chatbot
    else if (context === Contexts.Start) {
      // TODO use GPT to parse messages
      let instructions = `Instructions: Given INPUT, Generate an OUTPUT classification of either "HELP", "JIBO", "SCRATCH", "DESIGN" or "NOT SURE".\n` + 
      `Return "HELP" for INPUT that has to do with learning more about this you, a chatbot named Sparki. Like asking what this tool is or how you work.\n` + 
      `Return "JIBO" for INPUT that has to do with learning more about the social robot Jibo. Like asking who Jibo is or what he likes.\n` +
      `Return "SCRATCH" for INPUT that has to do with programming or Scratch or coding. Like asking for ideas for programming or for example code.\n` + 
      `Return "DESIGN" for INPUT that has to do with AI projects, designing AI projects, or working on a design journal. Saying you want to add to your design journal.\n` +
      `Return "NOT SURE" for INPUT that you're not sure goes into any of the other categories.\n` +
      `Example 1: INPUT Can you tell me about Jibo? OUTPUT "JIBO"\n` +
      `Example 2: INPUT How would you write Scratch code that make a sprite dance? OUTPUT "SCRATCH"\n` +
      `Example 3: INPUT Can you write my English essay for me? "NOT SURE"\n` +
      `INPUT ${userMsg} OUTPUT`;
      let resp = await GPT.getGPTResponse(instructions);


      console.log(`Classification: ${resp}`); // debug message

      if (resp.includes("HELP")) {
        this.actionProvider.handleHelp();
      } else if (resp.includes("JIBO")) {
        this.actionProvider.handleJiboDiscussion(userMsg);
      } else if (resp.includes("SCRATCH")) {
        this.actionProvider.handleScratchCode(userMsg);
      } else if (resp.includes("DESIGN")) {
      this.actionProvider.handleDesignJournal(userMsg);
      } else {
        this.actionProvider.handleStart(userMsg);
      }
    }
    // continue discussion about Design Journal
    else if (context === Contexts.DesignJournal) {
      this.actionProvider.handleDesignJournal(userMsg);
    }
    // continue discussion about Scratch programming
    else if (context === Contexts.ScratchChat) {
      this.actionProvider.handleScratchCode(userMsg);
    }
    // continue discussion about Jibo
    else if (context === Contexts.JiboChat) {
      this.actionProvider.handleJiboDiscussion(userMsg);
    }
    /** Parse the user input by adding to this else-if list.
     * Call the appropriate actionProvider function here
     */
    else {
      //console.log(`message parser ${userMsg}`); // for testing message parser
    }
  }
}

export default MessageParser;
