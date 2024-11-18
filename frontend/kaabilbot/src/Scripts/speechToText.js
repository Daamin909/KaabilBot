import errorMessageSound from "../assets/sound/error-message.mp3";
import client from "./../Utils/apiClient";
import writeMessages from "./writeMessages";
import { getCurrentTime } from "./handleInput";

const speechToText = async (audioBlob, setMessages, messages) => {
  const formData = new FormData();
  formData.append("audio", audioBlob, "recording.webm");
  try {
    const response = await client.post("/api/speech-to-text", formData);
    var reply = response.data;
    console.log(reply);
    var botContent = reply.bot;
    var userContent = reply.user;
  } catch (error) {
    showErrorMessage(`404: ${error}`);
  }
  const userMessage = {
    id: messages[messages.length - 1].id + 1,
    time: getCurrentTime(),
    sender: "user",
    content: userContent,
  };
  const botMessage = {
    id: userMessage.id + 1,
    time: getCurrentTime(),
    sender: "bot",
    content: botContent,
  };
  setMessages([...messages, userMessage, botMessage]);
  writeMessages([...messages, userMessage, botMessage]);
};
export const showErrorMessage = (message) => {
  const messageBox = document.createElement("div");
  messageBox.textContent = message;
  messageBox.style.position = "fixed";
  messageBox.style.bottom = "10vh";
  messageBox.style.left = "50%";
  messageBox.style.transform = "translateX(-50%)";
  messageBox.style.backgroundColor = "#f44336";
  messageBox.style.color = "white";
  messageBox.style.padding = "10px 20px";
  messageBox.style.borderRadius = "5px";
  messageBox.style.zIndex = "10000000";
  messageBox.style.fontSize = "18px";
  document.body.appendChild(messageBox);
  const errorMessage = new Audio(errorMessageSound);
  errorMessage.play();
  setTimeout(() => {
    messageBox.remove();
  }, 3000);
};

export default speechToText;
