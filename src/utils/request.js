import axios from "axios";

const request = axios.create({ baseURL: "http://localhost:3007/hotlines/" });

export default request;
