import axios from "axios";

const apiClient = axios.create({
    baseURL: __API_URL__,
    timeout: 5000,
    headers: {
        "Content-Type": "application/json",
    },
});

export default apiClient;