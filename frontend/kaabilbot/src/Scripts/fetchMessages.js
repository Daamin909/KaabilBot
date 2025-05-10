import client from "./../Utils/apiClient";
import { showErrorMessage } from "./speechToText";

const fetchMessages = (setMessages) => {
  try {
    client.post("/api/fetch-messages").then((resp) => {
      setMessages(resp.data);
    });
  } catch (err) {
    showErrorMessage(`404: ${err}`);
  }
};
export default fetchMessages;
