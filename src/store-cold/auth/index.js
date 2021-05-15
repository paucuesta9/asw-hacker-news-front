import axios from 'axios';
import { DataProvider } from '@/data-providers/_Index.js';

let apiKey = "113818567039641986985";
axios.defaults.headers.common['X-API-KEY'] = apiKey;

function getKey() {
    return apiKey;
}
function setUser() {
    // TODO Call to retrieve user from api
    let mockUser = {
        username: "Joan Vilarrasa",
        user_id: 1,
    }
    localStorage.setItem('user', mockUser);
    return localStorage.getItem('user');
}
function getUser() {
    return localStorage.getItem('user');
}
function setApiKey(newKey) {
    // Call and set new user
    apiKey = newKey
}
function clearAuthData() {
    delete axios.defaults.headers.common['X-API-KEY'];
}

export default {
    getKey: getKey,
    getUser: getUser,
    setApiKey: setApiKey,
    setUser: setUser,
    clearAuthData: clearAuthData,
}