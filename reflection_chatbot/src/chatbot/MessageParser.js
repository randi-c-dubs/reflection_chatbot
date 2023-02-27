// MessageParser starter code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  async parse(message) {
    console.log(message);
    let response = await this.generateSentence(message);
    console.log(response);
  }

  async generateSentence(usrMsg) {
    const params = {
      method: "POST",
      message: "Successfully generated sentence from GPT-3",
      body: JSON.stringify({
        model: "text-davinci-003",
        prompt: usrMsg,
        temperature: 0.7,
        max_tokens: 96,
        top_p: 1,
        n: 3,
        frequency_penalty: 0,
        presence_penalty: 0.3,
      }),
    };
    let response = await this.request(params);
    return response;
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
      const r = await fetch(`https://api.openai.com/v1/completions`, options);
      if (!r.ok) {
        const res = await r.json();
        throw new Error(res.error);
      }

      const res = await r.json();
      if (res.choices.length > 0) {
        return res.choices[0].text;
      }
    } catch (e) {
      console.log("There was an error fetching suggested sentences");
      console.log(e);
    }
  }
}

export default MessageParser;
