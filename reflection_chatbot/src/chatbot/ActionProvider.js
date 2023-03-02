// ActionProvider code
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

    this.apiAttemptLimit = 5;

    // initiate gpt chatbot
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

    // check for API key
    //this.clearApiKey();
    this.getApiKey();
  }

  getApiKey() {
    console.log(`getting API key`);
    this.apiKey = localStorage.getItem("OPENAI_KEY");

    while (!this.apiKey) {
      this.apiKey = window.prompt(`Please enter a valid key for OPENAI`);
      console.log(`got API key ${this.apiKey}`);
      if (this.apiKey && this.apiKey !== " ") {
        localStorage.setItem("OPENAI_KEY", this.apiKey);
      }
    }
  }

  clearApiKey() {
    console.log(`clearing stored API key`);
    localStorage.clear();
  }

  async generateSentence(userMsg) {
    // add most recent message to message log
    this.msgLog.push({ role: "user", content: userMsg });

    // make request of gpt
    // if there is an error (hopefully because of api key issue) will get stuck in a loop
    let resp;
    let attempts = 0;
    while (!resp && attempts < this.apiAttemptLimit) {
      resp = await this.gptRequest();
      attempts++;
    }
    // TODO at attempt limit, display error message and pause chatbot

    // post response to chat interface
    if (resp) {
      this.msgLog.push(resp.choices[0].message);

      const botMessage = this.createChatBotMessage(
        resp.choices[0].message.content
      );
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, botMessage],
      }));
    }
  }

  async gptRequest() {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    };
    options.body = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: this.msgLog,
      temperature: 0.7,
      max_tokens: 96,
      top_p: 1,
      n: 1,
      frequency_penalty: 0,
      presence_penalty: 0.3,
    });

    try {
      const r = await fetch(
        `https://api.openai.com/v1/chat/completions`,
        options
      );
      if (!r.ok) {
        if (r.status === 401) {
          this.clearApiKey();
          this.getApiKey();
        }
        const res = await r.json();
        throw new Error(res.error);
      }

      const res = await r.json();
      if (res.choices.length > 0) {
        //console.log(`request success ${res}`);
        return res;
      }
    } catch (e) {
      console.log("There was an error fetching suggested sentences");
      console.log(e);
    }
  }
}

export default ActionProvider;
