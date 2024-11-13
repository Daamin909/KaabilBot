import React from "react";

import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import ChatBox from "./Components/ChatBox/ChatBox";
import InputBox from "./Components/InputBox/InputBox";
const App = () => {
  const messages = [
    {
      id: 1,
      content: "Hello! How can I assist you today?",
      sender: "bot",
      time: "09:00 AM",
    },
    {
      id: 2,
      content: "Hi, I need help with my coding project.",
      sender: "user",
      time: "09:05 AM",
    },
    {
      id: 3,
      content: "Sure! What specifically are you working on?",
      sender: "bot",
      time: "09:10 AM",
    },
    {
      id: 4,
      content: "I'm stuck on an error I'm getting in my code.",
      sender: "user",
      time: "09:15 AM",
    },
    {
      id: 5,
      content: "Could you share the error message with me?",
      sender: "bot",
      time: "09:20 AM",
    },
  ];

  return (
    <div className="app">
      <NavBar />
      <div className="chat-interface-container">
        <ChatBox messages={messages} />
        <InputBox />
      </div>
    </div>
  );
};

export default App;
