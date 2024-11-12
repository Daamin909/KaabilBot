import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faCircleStop,
} from "@fortawesome/free-solid-svg-icons";
import "./InputBox.css";
const InputBox = () => {
  return (
    <div className="input-area">
      <input type="text" id="user-input" placeholder="Message KaabilBot" />
      <button className="button-input pushable" id="mic-button">
        <span className="front">
          <a id="start-icon">
            <FontAwesomeIcon icon={faMicrophone} />
          </a>
          <a id="stop-icon">
            <FontAwesomeIcon icon={faCircleStop} />
          </a>
        </span>
      </button>
      <button className="button-input pushable" id="send-button">
        <span className="front">
          <FontAwesomeIcon icon={faPaperPlane} />
        </span>
      </button>
    </div>
  );
};

export default InputBox;
