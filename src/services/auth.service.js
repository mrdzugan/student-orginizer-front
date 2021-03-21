import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/auth/`;

class AuthService {
    async login(email, password) {
        return await axios.post(API_URL + 'signin', { email, password });
    }

    async register(registerInfo) {
        return await axios.post(API_URL + 'signup', registerInfo);
    }
}

export default new AuthService();