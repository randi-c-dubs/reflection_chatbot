import React, { useState } from "react";
import Accounts from "./user_util/Accounts";
import GPT from "./gpt/GPTController";

import "react-chatbot-kit/build/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function Login(props) {
  const [loginKey, setLoginKey] = useState("");

  const updateLoginKey = (e) => {
    // make sure user inputs something or put validation message
    if (!e.target.value) {
      e.target.setCustomValidity(`Enter a key to access this website`);
    } else if (!e.target.value.startsWith(`sparki-`) && !e.target.value.startsWith(`sk-`)) {
        e.target.setCustomValidity(`Valid keys start with sparki- or sk-`);
    } else {
      e.target.setCustomValidity(``);
      // update login key to latest value
      setLoginKey(e.target.value);
    }
  };

  const handleLoginInfo = async (e) => {
    e.preventDefault();

    // add "was-validated" class to form
    e.target.className = "was-validated";

    if (loginKey.startsWith("sparki-")) {
      await Accounts.setSecretKey(loginKey);
    } else if (loginKey.startsWith("sk-")) {
      GPT.setApiKey(loginKey, true);
    }

    // test the key to see if it works
    let prompt = `Testing 123`;
    let resp = await GPT.getGPTResponse(prompt);
    console.log(resp);
    if (!resp) {
      // send message that this key is invalid
      e.target[0].setCustomValidity(`This key is invalid`);
      console.log(`login key failed ${loginKey}`);
    } else {
        console.log("login with key succeeded");
      // send message that this key is valid
      e.target[0].setCustomValidity(``);
      props.updateApiKey(loginKey);
    }
  };

  return (
    <div className="Login">
      <div className="login-wrapper">
        <h1>Please login to use this website</h1>
        <form className="needs-validation" onSubmit={handleLoginInfo}>
          <div className="input-group mb-3 w-50 mx-auto">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Sparki or OpenAI Key"
              onChange={updateLoginKey}
              required
            />
            <div className="invalid-feedback order-last">
              Enter a valid key from Sparki or the OpenAI API.
            </div>
            <button className="btn btn-outline-light" type="submit">
              Enter
            </button>
          </div>
        </form>
      </div>
      <div className="disclaimer-wrapper">
        <h3>By continuing, you agree to the following:</h3>
        <ul>
          <li>
            You are aware that this tool may produce content that is not
            appropriate for all ages, and you are solely responsible for
            determining the appropriateness of the content for their audience.
          </li>
          <li>
            The tool may produce content that contains errors, inaccuracies, or
            omissions, and you assume all risk associated with using the tool
            and the resulting content.
          </li>
          <li>
            The developer of the tool assumes no liability for any damages
            arising from the use of the tool or the resulting content, including
            but not limited to direct, indirect, incidental, and consequential
            damages.
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Login;
