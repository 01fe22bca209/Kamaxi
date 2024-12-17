import axios from "axios";

const instance = axios.create({
    baseURL: "https://kamaxi3-updated-api.vercel.app/users",
});

export default instance;
