import axios from "axios";

const client = axios.create({
  baseURL: "https://kaabilbot.daamin.hackclub.app/",
});

export default client;
