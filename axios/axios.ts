import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://142.93.248.99/api/',
    timeout: 1000,
    headers: {'X-auth-token': '5f6a113a8bb9e14b83dddbda'}
});

export default instance;