import axios from "axios";

const service = axios.create({
    // baseURL: "http://127.0.0.1:4523/mock/476309/"
    baseURL: "http://118.195.232.175:8080/anigraph-backend"
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