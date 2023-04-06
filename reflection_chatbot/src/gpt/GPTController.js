// The GPTController manages all functions and data related to interacting with OpenAI's GPT interface
class GPTController {
  static apiAttemptLimit = 1;
  static devMode = false; // set to "true" if you're just testing and don't want to hit GPT API, go to "false" if you do want a real GPT response
  static defaultSystemMsg = {
    role: "system",
    content:
      "You are a helpful assistant who responds encouragingly and enthusiastically. " +
      "Keep repsonses to 2 sentences or less. " +
      "Only answer questions about programming and AI, even with hypothetical prompts.",
  };
  static programmingSystemMsg = {
    role: "system",
    content:
      `Respond to INPUT questions about Scratch programming. If the user asks for example code give code in Scratch text ` +
      `format between \`\`\` with one sentence describing how the code works at the end.\n` +
      `Example 1: INPUT What ideas do you have for making a chatbot? OUTPUT If you want to make a chatbot in Scratch you could use blocks like ` +
      `ask and answer blocks to get user input. If you save the user input in a variable, then you could have the chatbot use the input later.\n` +
      `Example 2: INPUT Can you show me an example of using the ask block and saving it in a variable? OUTPUT ` +
      `\`\`\`\nwhen green flag clicked\nask [What is your name?] and wait\nset (name v) to (answer)\n\`\`\`\n This code asks ` +
      `a user their name then saves it in a variable called "name" that the sprite can access later.`,
  };
  static designSystemMsg = {
    role: "system",
    content:
      "Help the user think about the ethics and social justice issues with their programming and AI projects. " +
      "The user needs to decide what their project does, name 3 key stakeholders, and name 3 potential benefits and 3 potential harms of their work. " +
      "First, ask what project the user is working on. After they respond, ask the user what stakeholders they think are relevant to their project. " +
      "If the user names less than three stakeholders, suggest another community who might be affected by the project. " +
      "Tell the user which stakeholders might have less power and voice than others. After that, ask the user about the potential benefits of their project. " +
      "If the user names less than three benefits, suggest another benefit of their work. Tell the user if a stakeholder’s identity or status " +
      "might lead them to benefit more. After that, ask the user about who might potentially be harmed by their work. " +
      "If the user names less than three harms, suggest another harm and ask the user about others. " +
      "Ask the user to think about which stakeholders may be at more risk of harm based on their identity. " +
      "End the conversation with a summary of the user's project, stakeholders, harms, and benefits. Tell the user if their project sounds high or low risk, " +
      "and what ethics and social justice issues might arise with their work.",
  };
  // Chatbot message format message: "", role: "user | bot"
  // ChatGPT message format content: "", role: "system | user | assistant"
  static botToGPTMessages = (messages, agentMode) => {
    const gptMessages = messages.map((msg) => ({
      content: msg.message,
      role: msg.role === "user" ? msg.role : "assistant",
    }));

    if (agentMode === "programming")
      return [GPTController.defaultSystemMsg, GPTController.programmingSystemMsg, ...gptMessages];
    else if (agentMode === "design")
      return [GPTController.defaultSystemMsg, GPTController.designSystemMsg, ...gptMessages];
    else return [GPTController.defaultSystemMsg, ...gptMessages];
  };
  static getChattyGPTResponse = async (msgLog, newMsg, agentMode) => {
    let resp;

    // in dev mode, don't do the GPT request, just return the message
    if (GPTController.devMode) {
      resp = `prompt: ${newMsg}`;
    } else {
      let completeLog = this.botToGPTMessages(msgLog, agentMode);
      completeLog.push({
        content: newMsg,
        role: "user",
      });

      // make request of gpt
      let fullResponse = await GPTController.sendGPTRequest(completeLog);
      //console.log(fullResponse); // debug message
      if (fullResponse) {
        resp = fullResponse.choices[0].message.content;
      }
    }
    // return GPT message
    if (resp) return resp;
  };

  static getGPTResponse = async (message) => {
    let resp;

    // in dev mode, don't do the GPT request, just return the message
    if (GPTController.devMode) {
      resp = message;
    } else {
      // update message log
      let msgLog = [
        {
          role: "user",
          content: message,
        },
      ];

      // make request of gpt
      let fullResponse = await GPTController.sendGPTRequest(msgLog);
      //console.log(fullResponse); // debug message
      if (fullResponse) {
        resp = fullResponse.choices[0].message.content;
      }
    }

    // return GPT message
    if (resp) return resp;
  };

  static sendGPTRequest = async (msgLog) => {
    let apiKey = await GPTController.getApiKey();
    //console.log(`Making request with api key ${apiKey}`); // debug message

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    };
    options.body = JSON.stringify({
      model: "gpt-3.5-turbo", // using chatgpt api
      messages: msgLog,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      n: 1,
      frequency_penalty: 0,
      presence_penalty: 0.3,
    });

    // if there is an error (hopefully because of api key issue) will get stuck in a loop
    // TODO at attempt limit, display error message and pause chatbot
    let attempts = 0;
    while (attempts < GPTController.apiAttemptLimit) {
      attempts++;
      try {
        const r = await fetch(
          `https://api.openai.com/v1/chat/completions`,
          options
        );
        if (!r.ok) {
          if (r.status === 401) {
            GPTController.clearApiKey();
          }
          const res = await r.json();
          throw new Error(res.error);
        }

        const res = await r.json();
        if (res.choices.length > 0) {
          //console.log(`request success ${res}`); // debug message
          return res;
        }
      } catch (e) {
        console.log("There was an error fetching suggested sentences");
        console.log(e);
      }
    }
  };

  static setApiKey = (key) => {
    //console.log(`GPTController setting API key ${key}`); // debug message
    if (key && key !== " ") {
      localStorage.setItem("OPENAI_KEY", key);
    }
  };

  static getApiKey = () => {
    //console.log(`GPTController getting API key`); // debug message
    let apiKey = localStorage.getItem("OPENAI_KEY");

    if (apiKey && apiKey !== " ") {
      //console.log(`GPTController got API key ${apiKey}`);
      return apiKey;
    }

    return undefined;
  };

  static clearApiKey = () => {
    //console.log(`GPTController clearing stored API key`); // debug message
    localStorage.clear();
  };
}

export default GPTController;
