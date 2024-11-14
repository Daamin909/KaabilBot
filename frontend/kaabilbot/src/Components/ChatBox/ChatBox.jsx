import React, { useEffect, useState } from "react";

import { Axios } from "axios";
import "./ChatBox.css";
import Message from "../Message/Message";
import fetchMessages from "../../Scripts/fetchMessages";
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => fetchMessages(setMessages), []);
  return (
    <div className="chat-box">
      {...messages.map((message) => {
        return (
          <Message
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
