// MessageParser starter code
class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(userMsg) {
    //console.log(`message parser ${userMsg}`);
    this.actionProvider.generateSentence(userMsg);
  }

}

export default MessageParser;
