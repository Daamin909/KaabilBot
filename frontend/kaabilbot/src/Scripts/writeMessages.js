import client from "../Utils/apiClient";

const writeMessages = (messages) => {
  client.post("/api/write-messages", { data: messages }).then((resp) => {});
};

export default writeMessages;
