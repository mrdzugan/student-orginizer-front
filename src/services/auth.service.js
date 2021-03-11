import axios from 'axios';

const API_URL = 'http://192.168.88.150:8000/api/auth/';

class AuthService {
    async login(email, password) {
        return await axios.post(API_URL + 'signin', { email, password });
    }

    logout() {
        window.location.href = '/';
        localStorage.removeItem('user');
    }

    async register(registerInfo) {
        return await axios.post(API_URL + 'signup', registerInfo);
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}

export default new AuthService();