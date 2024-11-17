import React from "react";

import "./ChatBox.css";
import Message from "../Message/Message";
const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages &&
        messages.map((message) => {
          return (
            <Message
              key={message.id}
              id={message.id}
              sender={message.sender}
              content={message.content}
              time={message.time}
            />
          );
        })}
    </div>
  );
};

export default ChatBox;
