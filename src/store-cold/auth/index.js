import axios from 'axios';
function getToken() {
    return localStorage.getItem('token');
}
function setToken(newToken) {
    localStorage.setItem('token', newToken);
}
function clearAuthData() {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
}

export default {
    getToken: getToken,
    setToken: setToken,
    clearAuthData: clearAuthData,
}