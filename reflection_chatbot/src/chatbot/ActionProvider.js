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
    this.updateContext(Contexts.Start);
    let prompt = `${rephraseHeader} "I can only help with a few specific things. What would you like to do?"`;
    let resp = await GPT.getGPTResponse(prompt);
    this.sayAndShowWidget(resp, { widget: "startMenu" });
  };

  requestApiKey = async () => {
    this.updateContext(Contexts.RequestApiKey);
    this.say(`Please enter a vaid API key from OpenAI.`);
  };

  handleApiKey = async (userMsg) => {
    //console.log(`Action Provider handle API key`); // debug message
    GPT.setApiKey(userMsg);

    let prompt = `${rephraseHeader} "This API key worked."`;
    let resp = await GPT.getGPTResponse(prompt);
    if (!resp) {
      this.requestApiKey();
    } else {
      this.say(resp);
      this.handleStart();
    }
  };

  /**  Design Journal Actions   **/
  handleDesignJournal = async (message) => {
    if (message === "button start") {
      // TODO save state of design journal and use it to personalize response
      let prompt = `${rephraseHeader} "It looks like you're just getting started with your design journal. Which part would you like to work on?"`;
      let resp = await GPT.getGPTResponse(prompt);
      this.sayAndShowWidget(resp, { widget: "designJournalMenu" });
    } else {
      this.say(`Design Journal ${message}`);
    }

    // Update the context so the bot knows to keep the design jounal discussion message log
    this.updateContext(Contexts.DesignJournal);
  };

  /**  Help Actions  **/
  handleHelp = async () => {
    this.updateContext(Contexts.Help);

    this.sayAndShowWidget("Here is some information about Sparki", {
      widget: "helpCards",
    });
  };

  /** Stub Scratch Code Displayer **/
  handleScratchCode = async (message) => {
    // Update the context so the bot knows to keep the Scratch discussion
    this.updateContext(Contexts.ScratchChat);

    if (message === "button start") {
      let prompt = `${rephraseHeader} What are you coding today?`;
      let resp = await GPT.getGPTResponse(prompt);

      this.say(resp);
    } else {
      // TODO add instructions to follow block syntax: https://en.scratch-wiki.info/wiki/Block_Plugin/Syntax
      let promptAndMsg =
        `Respond to this INPUT question about Scratch programming. If the user asks for example code give code in Scratch text ` +
        `format between \`\`\` with one sentence describing how the code works at the end.\n` + 
        `Example 1: INPUT What ideas do you have for making a chatbot? OUTPUT If you want to make a chatbot in Scratch you could use blocks like ` +
        `ask and answer blocks to get user input. If you save the user input in a variable, then you could have the chatbot use the input later.\n` +
        `Example 2: INPUT Can you show me an example of using the ask block and saving it in a variable? OUTPUT ` +
        `\`\`\`\nwhen green flag clicked\nask [What is your name?] and wait\nset (name v) to (answer)\n\`\`\`\n This code asks ` +
        `a user their name then saves it in a variable called "name" that the sprite can access later.\n` +
        `INPUT ${message} OUTPUT`;

      let resp = await GPT.getChattyGPTResponse(
        this.stateRef.contextMessages,
        promptAndMsg
      );
      console.log(resp); // debug message

      // the code is all the text between ``
      const codeRegex = /(?<=```)[\s\S]*?(?=```)/g;
      const codeMatches = resp.match(codeRegex);
      if (codeMatches && codeMatches.length > 0) {
        // console.log(codeMatches[0]); // debug message
        this.setState((prev) => ({
          ...prev,
          scratchCode: codeMatches[0],
        }));

        // ChatGPT usually explains its coding
        const nonCodeRegex = /```/;
        const nonCodeMatches = resp.split(nonCodeRegex);

        let withCodeResp = "Check out this example";
        if (nonCodeMatches && nonCodeMatches.length > 2)
          withCodeResp = nonCodeMatches[2];

        // Add the users' message to the context messages
        this.updateContextMessages(this.createClientMessage(message));
        // Use "say" or "sayAndShowWidget" functions to have the chatbot reply
        this.sayAndShowWidget(withCodeResp, {
          widget: "displayScratchCode",
        });
      }
      // if there was a failure to get code for some reason, deliver the response
      else {
        // Add the users' message to the context messages
        this.updateContextMessages(this.createClientMessage(message));
        // Use "say" or "sayAndShowWidget" functions to have the chatbot reply
        this.say(resp);
      }
    }
  };

  /** Jibo Handler **/
  handleJiboDiscussion = async (message) => {
    // Update the context so the bot knows to keep the Jibo discussion msglog
    this.updateContext(Contexts.JiboChat);

    if (message === "button start") {
      let prompt = `${rephraseHeader} "What would you like to learn about Jibo?"`;
      let resp = await GPT.getGPTResponse(prompt);

      // Use "say" or "sayAndShowWidget" functions to have the chatbot reply
      this.sayAndShowWidget(resp, { widget: "exampleJiboWidget" });
    } else {
      // Use prompts to give instructions to GPT
      let promptAndMsg = `Answer this question about Jibo, an awesome social robot with the personality of a 10-year-old who loves penguins and the color blue: ${message}`;

      // Call GPT.getChattyGPTResponse to get response from GPT
      // You can also use getGPTResponse to get a briefer response
      let resp = await GPT.getChattyGPTResponse(
        this.stateRef.contextMessages,
        promptAndMsg
      );

      // Add the users' message to the context messages
      this.updateContextMessages(this.createClientMessage(promptAndMsg));
      // Use "say" or "sayAndShowWidget" functions to have the chatbot reply
      this.say(resp);
    }
  };

  /**  Chatbot utility funcions **/

  say = (botMsg = "hello world") => {
    this.sendBotMessage(this.createChatBotMessage(botMsg));
  };

  sayAndShowWidget = (botMsg = "hello world", widget) => {
    this.sendBotMessage(this.createChatBotMessage(botMsg, widget));
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

  sendBotMessage = (botMsg) => {
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
