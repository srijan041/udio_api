import axios from 'axios';
import { BASE_URL, COOKIE } from '../constants.js';

axios.defaults.withCredentials = true;

const headers = {
    'Content-Type': 'application/json',
    'Cookie': `${COOKIE}`,
}

export const axiosInstance = axios.create({
    baseURL: BASE_URL,
    headers
})