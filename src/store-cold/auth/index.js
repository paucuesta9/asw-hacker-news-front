import axios from 'axios';
let apiKey = "113818567039641986985";
axios.defaults.headers.common['X-API-KEY'] = apiKey;

function getKey() {
    return apiKey;
}
function setApiKey(newKey) {
    apiKey = newKey
}
function clearAuthData() {
    delete axios.defaults.headers.common['X-API-KEY'];
}

export default {
    getKey: getKey,
    setApiKey: setApiKey,
    clearAuthData: clearAuthData,
}