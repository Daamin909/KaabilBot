import client from "./../Utils/apiClient";

const fetchMessages = (setMessages) => {
  client.post("/api/fetch-messages").then((resp) => {
    setMessages(resp.data);
  });
};
export default fetchMessages;
