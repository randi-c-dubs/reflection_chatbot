import React from "react";
import Chatbot from "react-chatbot-kit";

import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import config from "./chatbot/config";

import "./App.css";
import 'react-chatbot-kit/build/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
    <header className="App-header">
        <Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
        />
      </header>
    </div>
  );
}

export default App;
