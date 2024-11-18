import axios from "axios";

const client = axios.create({ baseURL: " http://192.168.29.159:5000" });

export default client;
