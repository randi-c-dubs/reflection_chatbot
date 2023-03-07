class GPTController {
  constructor(state) {
    this.state = {
      apiKey: this.getApiKey(),
      ...state,
    };
  }

  async getResponse(msgLog) {
    // make request of gpt
    // if there is an error (hopefully because of api key issue) will get stuck in a loop
    let resp;
    let attempts = 0;
    while (!resp && attempts < this.apiAttemptLimit) {
      resp = await this.GPTRequest(msgLog);
      attempts++;
    }
    // TODO at attempt limit, display error message and pause chatbot

    if (resp) return resp;
  }

  async GPTRequest(msgLog) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    };
    options.body = JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: msgLog,
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

  getApiKey() {
    console.log(`Message Parser getting API key`);
    let apiKey = localStorage.getItem("OPENAI_KEY");

    while (!this.apiKey) {
      this.apiKey = window.prompt(`Please enter a valid key for OPENAI`);
      console.log(`got API key ${this.apiKey}`);
      if (this.apiKey && this.apiKey !== " ") {
        localStorage.setItem("OPENAI_KEY", this.apiKey);
      }
    }

    return apiKey;
  }

  clearApiKey() {
    console.log(`clearing stored API key`);
    localStorage.clear();
  }
}

export default GPTController;
