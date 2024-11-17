import axios from "axios";

const client = axios.create({ baseURL: "https://kaabilbot.onrender.com" });

export default client;
