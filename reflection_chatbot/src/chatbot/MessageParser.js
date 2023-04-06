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
      
      let flag = await this.moveFromStart(userMsg);
      console.log(`Classification: ${flag}`); // debug message

      if (flag.includes("HELP")) {
        this.actionProvider.handleHelp();
      } else if (flag.includes("JIBO")) {
        this.actionProvider.handleJiboDiscussion(userMsg);
      } else if (flag.includes("SCRATCH")) {
        this.actionProvider.handleScratchCode(userMsg);
      } else if (flag.includes("DESIGN")) {
      this.actionProvider.handleDesignJournal(userMsg);
      } else {
        this.actionProvider.handleStart(userMsg);
      }
    }
    // continue discussion about AI project
    else if (context === Contexts.DesignJournal) {
      let flag = await this.continueOrStopDiscussion(userMsg);

      if (flag.includes("CONTINUE")) {
        this.actionProvider.handleDesignJournal(userMsg);
      } else { // TODO something more intelligent with the "NOT SURE"
        this.actionProvider.handleStart(userMsg);
      }
    }
    // continue discussion about Scratch programming
    else if (context === Contexts.ScratchChat) {
      let flag = await this.continueOrStopDiscussion(userMsg);

      if (flag.includes("CONTINUE")) {
        this.actionProvider.handleScratchCode(userMsg);
      } else { // TODO something more intelligent with the "NOT SURE"
        this.actionProvider.handleStart(userMsg);
      }
    }
    // continue discussion about Jibo
    else if (context === Contexts.JiboChat) {
      let flag = await this.continueOrStopDiscussion(userMsg);
      
      if (flag.includes("CONTINUE")) {
        this.actionProvider.handleJiboDiscussion(userMsg);
      } else { // TODO something more intelligent with the "NOT SURE"
        this.actionProvider.handleStart(userMsg);
      }
    }
    /** Parse the user input by adding to this else-if list.
     * Call the appropriate actionProvider function here
     */
    else {
      //console.log(`message parser ${userMsg}`); // for testing message parser
    }
  }

  async moveFromStart(message) {
    let instructions = `Instructions: Given INPUT, Generate an OUTPUT classification of either "HELP", "JIBO", "SCRATCH", "DESIGN" or "NOT SURE".\n` + 
      `Return "HELP" for INPUT that has to do with learning more about this you, a chatbot named Sparki. Like asking what this tool is or how you work.\n` + 
      `Return "JIBO" for INPUT that has to do with learning more about the social robot Jibo. Like asking who Jibo is or what he likes.\n` +
      `Return "SCRATCH" for INPUT that has to do with programming or Scratch or coding. Like asking for ideas for programming or for example code.\n` + 
      `Return "DESIGN" for INPUT that has to do with AI projects, designing AI projects, or working on a design journal. Saying you want to add to discuss an AI project.\n` +
      `Return "NOT SURE" for INPUT that you're not sure goes into any of the other categories.\n` +
      `Example 1: INPUT Can you tell me about Jibo? OUTPUT "JIBO"\n` +
      `Example 2: INPUT How would you write Scratch code that make a sprite dance? OUTPUT "SCRATCH"\n` +
      `Example 3: INPUT Can you write my English essay for me? "NOT SURE"\n` +
      `INPUT ${message} OUTPUT`;
      return await GPT.getGPTResponse(instructions);
  }

  async continueOrStopDiscussion(message) {
    let instructions = `Instructions: Given INPUT, Generate an OUTPUT classification of either "CONTINUE", "QUIT", or "NOT SURE".\n` +
    `Return "CONTINUE" for INPUT that seems like a continuation of a conversation about AI or programming. This includes compliments and questions.\n` +
  `Return "QUIT" for INPUT that has to do with ending a conversation. Like expressing thanks for help or asking to return to the start menu. \n` +
  `Return "NOT SURE" for INPUT that you're not sure goes into any of the other categories.\n` +
  `Example 1: INPUT I'm building an AI assistant to help students working on AI projects. The system offers programming and design support\n` +
   `OUTPUT "JIBO"\n` +
  `Example 2: INPUT What biases are in decision-making algorithms? OUTPUT "CONTINUE"\n` +
  `Example 3: INPUT Ok I like that. OUTPUT "CONTINUE"\n` +
  `Example 4: INPUT Go back to menu. OUTPUT "QUIT"\n` +
  `Example 5: INPUT Show start menu options. OUTPUT "QUIT"\n` +
  `Example 6: INPUT Thanks, for helping me with this. OUTPUT "NOT SURE"\n` +
  `Example 7: INPUT Can you write my English essay for me? "NOT SURE"\n` +
  `INPUT ${message} OUTPUT\n`;
  return await GPT.getGPTResponse(instructions);
  }

}

export default MessageParser;
