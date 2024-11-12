import React from "react";

import "./ChatInterface.css"
import InputBox from "./InputBox/InputBox";
import ChatBox from "./ChatBox/ChatBox";
const ChatInterface = () => {
  return (
    <div className="chat-interface">
      <ChatBox />
      <InputBox />
    </div>
  );
};

export default ChatInterface;
