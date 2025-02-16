import axios from "axios";
import { USER_API_END_POINT } from "./const.js";

const instance = axios.create({
    baseURL: `${USER_API_END_POINT}`, // Backend URL
    withCredentials: true, // ✅ Sends cookies with requests
    headers: {
        "Content-Type": "application/json",
    },
});

export default instance;
