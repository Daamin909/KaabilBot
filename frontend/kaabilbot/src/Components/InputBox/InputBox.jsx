import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faCircleStop,
} from "@fortawesome/free-solid-svg-icons";

import "./InputBox.css";
import handleInput from "../../Scripts/handleInput";

const InputBox = ({ setMessages, messages }) => {
  const [inputValue, setInputValue] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    handleInput(inputValue, setMessages, messages);
    setInputValue("");
  };
  return (
    <div className="input-area">
      <form onSubmit={handleSubmit}>
        <input
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          type="text"
          id="user-input"
          placeholder="Message KaabilBot"
        />
        <button type="button" className="button-input pushable" id="mic-button">
          <span className="front">
            <a id="start-icon">
              <FontAwesomeIcon icon={faMicrophone} />
            </a>
            {/* <a id="stop-icon">
              <FontAwesomeIcon icon={faCircleStop} />
            </a> */}
          </span>
        </button>
        <button
          type="submit"
          className="button-input pushable"
          id="send-button"
        >
          <span className="front">
            <FontAwesomeIcon icon={faPaperPlane} />
          </span>
        </button>
      </form>
    </div>
  );
};

export default InputBox;
