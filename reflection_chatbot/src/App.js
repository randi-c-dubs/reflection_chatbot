import React from "react";
import ProjectDescription from "./form/components/ProjectDescription";

import Chatbot from "react-chatbot-kit";
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import config from "./chatbot/config";

import "react-chatbot-kit/build/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ProjectDescription />
        {/*<Chatbot
          config={config}
          actionProvider={ActionProvider}
          messageParser={MessageParser}
  />*/}
      </header>
    </div>
  );
}

export default App;
