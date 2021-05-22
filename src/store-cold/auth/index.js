import axios from 'axios';
import { DataProvider } from '@/data-providers/_Index.js';

const apiKeys = [
    "115878340549743171352",
    "113818567039641986985",
]

async function setUser(user_id) {
    let newUserId = user_id == null ? 2 : user_id;
    axios.defaults.headers.common['X-API-KEY'] = apiKeys[newUserId-1];
    let user = await DataProvider("USERS", "GET_USER", newUserId).then((res) => {return res});
    user.apiKey = apiKeys[newUserId-1];
    localStorage.setItem('user', JSON.stringify(user));
    return JSON.parse(localStorage.getItem('user'));
}
function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}

export default {
    getUser: getUser,
    setUser: setUser,
}