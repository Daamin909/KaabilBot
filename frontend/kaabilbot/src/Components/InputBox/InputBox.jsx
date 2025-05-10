import React, { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faMicrophone,
  faCircleStop,
} from "@fortawesome/free-solid-svg-icons";

import "./InputBox.css";
import handleInput from "../../Scripts/handleInput";
import speechToText, { showErrorMessage } from "../../Scripts/speechToText";

const InputBox = ({ setMessages, messages }) => {
  const mediaRecorderRef = useRef(null);
  const audioChunks = useRef([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunks.current = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.current.push(event.data);
      };
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
        speechToText(audioBlob, setMessages, messages);
      };
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      setIsRecording(false);
      if (error.name === "NotAllowedError") {
        showErrorMessage("Permission Denied Error");
        alert("Please enable microphone access.");
      } else {
        showErrorMessage("Error 404. Please try again later.");
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current = null;
    }
    setIsRecording(false);
  };

  const handleRecordingToggle = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

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
        <button
          type="button"
          className="button-input pushable"
          id="mic-button"
          onClick={handleRecordingToggle}
        >
          <span className="front">
            {!isRecording && (
              <a id="start-icon">
                <FontAwesomeIcon icon={faMicrophone} />
              </a>
            )}
            {isRecording && (
              <a id="stop-icon">
                <FontAwesomeIcon icon={faCircleStop} />
              </a>
            )}
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
