import axios from "axios";

const service = axios.create({
    // baseURL: "http://127.0.0.1:4523/mock/476309/"
    baseURL: "http://localhost:8000"
});

service.interceptors.request.use((config) => {
    return {
        ...config,
        url: `${config.url}`,
    };
});

service.interceptors.response.use((response) => {
    switch (response.status) {
        case 200:
            return response;
        default:
    }

}, (err) => {
    return Promise.reject(err);
});

export {
    service as axios
};