import React, { useEffect } from "react";
import Chatbot from "react-chatbot-kit";

import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import config from "./chatbot/config";
import Storage from "./user_util/StorageLog";

import "react-chatbot-kit/build/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  useEffect(() => {
    window.addEventListener("beforeunload", endSession);

    return () => {
      window.removeEventListener("beforeunload", endSession);
    };
  }, []);

  const endSession = () => {
    Storage.uploadLog();
  };

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
