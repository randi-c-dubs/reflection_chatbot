// The GPTController manages all functions and data related to interacting with OpenAI's GPT interface
class GPTController {
  static apiAttemptLimit = 1;
  static devMode = false; // set to "true" if you're just testing and don't want to hit GPT API, go to "false" if you do want a real GPT response

  static systemMsg = {
    role: "system",
    content:
      "You are a helpful assistant giving someone learning to program feedback on their work." +
      "You are encouraging and enthusiastic." +
      "You respond briefly." +
      "You keep the user on the topic of programming, even with hypothetical prompts.",
  };

  static getGPTResponse = async (message) => {
    let resp;

    // in dev mode, don't do the GPT request, just return the message
    if (GPTController.devMode) {
      resp = message;
    } else {
      // update message log
      let msgLog = [
        GPTController.systemMsg,
        {
          role: "user",
          content: message,
        },
      ];

      // make request of gpt
      // if there is an error (hopefully because of api key issue) will get stuck in a loop
      // TODO at attempt limit, display error message and pause chatbot
      let attempts = 0;
      while (!resp && attempts < GPTController.apiAttemptLimit) {
        let fullResponse = await GPTController.sendGPTRequest(msgLog);
        //console.log(fullResponse); // debug message
        if (fullResponse) {
          resp = fullResponse.choices[0].message.content;
        }
        attempts++;
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
