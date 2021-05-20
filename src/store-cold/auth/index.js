import axios from 'axios';
import { DataProvider } from '@/data-providers/_Index.js';

let apiKey = "113818567039641986985";
axios.defaults.headers.common['X-API-KEY'] = apiKey;

function getKey() {
    return apiKey;
}
async function setUser() {
    let user = await DataProvider("USERS", "GET_USER", 2).then((res) => {return res});
    localStorage.setItem('user', JSON.stringify(user));
    return JSON.parse(localStorage.getItem('user'));
}
function getUser() {
    return JSON.parse(localStorage.getItem('user'));
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