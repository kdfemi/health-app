import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://142.93.248.99/api/',
    timeout: 60000,
    headers: {'X-auth-token': '5f69dec3f542ca47b40b3fc3'}
});

export default instance;