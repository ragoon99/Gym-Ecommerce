import axios from 'axios';

export default function axiosInstance(token = null) {
    const data = {
        baseURL: 'http://127.0.0.1:8000/',
    };

    if (token) {
        data.headers = {
            Authorization: `Token ${token}`,
        };
    }

    return axios.create(data);
}
