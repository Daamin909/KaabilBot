import React from "react";

import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import ChatBox from "./Components/ChatBox/ChatBox";
import InputBox from "./Components/InputBox/InputBox";
const App = () => {
  return (
    <div className="app">
      <NavBar />
      <div className="chat-interface-container">
        <ChatBox />
        <InputBox />
      </div>
    </div>
  );
};

export default App;
