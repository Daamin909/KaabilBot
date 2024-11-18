import client from "../Utils/apiClient";
import { showErrorMessage } from "./speechToText";

const writeMessages = (messages) => {
  try {
    client.post("/api/write-messages", { data: messages }).then((resp) => {});
  } catch (err) {
    showErrorMessage(`404: ${err}`);
  }
};

export default writeMessages;
