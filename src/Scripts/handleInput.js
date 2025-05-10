import client from "./../Utils/apiClient";
import writeMessages from "./writeMessages";
import { showErrorMessage } from "./speechToText";

const handleInput = async (input, setMessages, messages) => {
  const userMessage = {
    id: messages[messages.length - 1].id + 1,
    time: getCurrentTime(),
    sender: "user",
    content: input,
  };
  setMessages([...messages, userMessage]);
  const response = await getResponse(input);
  const botMessage = {
    id: userMessage.id + 1,
    time: getCurrentTime(),
    sender: "bot",
    content: response,
  };
  setMessages([...messages, userMessage, botMessage]);
  writeMessages([...messages, userMessage, botMessage]);
};

export const getCurrentTime = () => {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;
  const formattedMinutes = minutes.toString().padStart(2, "0");

  return `${hours}:${formattedMinutes} ${ampm}`;
};
export default handleInput;

const getResponse = async (input) => {
  try {
    const resp = await client.post("/api/get-response", { message: input });
    const reply = resp.data;
    return reply;
  } catch (err) {
    showErrorMessage(`404" ${err}`);
  }
};
