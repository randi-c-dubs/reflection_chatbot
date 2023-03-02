// ActionProvider starter code
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
    this.msgLog = [
      {"role": "system", "content": "You are a helpful assistant giving someone learning to program feedback on their work. You are encouraging and enthusiastic. You respond briefly."},
      {"role": "assistant", "content": "Welcome to the Reflection Chatbot. What would you like to chat about?"},
    ];
  }

  async generateSentence(userMsg) {
    // add most recent message to message log
    this.msgLog.push({"role":"user","content":userMsg});

    // make request of gpt 
    const params = {
      method: "POST",
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: this.msgLog,
        temperature: 0.7,
        max_tokens: 96,
        top_p: 1,
        n: 1,
        frequency_penalty: 0,
        presence_penalty: 0.3,
      }),
    };
    let resp = await this.request(params);
    //console.log(`generate sentence ${resp.choices[0].message.content}`);
    this.msgLog.push(resp.choices[0].message);
    
    // post response to chat interface
    const botMessage = this.createChatBotMessage(resp.choices[0].message.content);
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  }

  async request(params) {
    const options = {
      method: params.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_KEY}`,
      },
    };
    if (params.body) {
      options.body = params.body;
    }

    try {
      const r = await fetch(`https://api.openai.com/v1/chat/completions`, options);
      if (!r.ok) {
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
