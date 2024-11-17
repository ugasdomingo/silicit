//Import tools
import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://silicitapi.vercel.app/api/v1',
    withCredentials: true
});
