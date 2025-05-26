import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5173/api",
    withCredentials: true // This allows cookies to be sent with requests
})

