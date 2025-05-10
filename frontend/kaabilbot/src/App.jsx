import React, { useState, useEffect, useRef } from "react";
import fetchMessages from "./Scripts/fetchMessages";

import "./App.css";
import NavBar from "./Components/NavBar/NavBar";
import ChatBox from "./Components/ChatBox/ChatBox";
import InputBox from "./Components/InputBox/InputBox";
const App = () => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef(null);
  useEffect(() => fetchMessages(setMessages), []);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <div className="app">
      <NavBar />
      <div className="chat-interface-container">
        <ChatBox messages={messages} scrollRef={scrollRef} />
        <InputBox messages={messages} setMessages={setMessages} />
      </div>
    </div>
  );
};

export default App;
