import axios from 'axios';
import getAuthHeader from './auth-header';

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/user`;

class UserService {
    getUser(id) {
        return axios.get(`${API_URL}/${id}`, { headers: getAuthHeader() });
    }

    /*getPublicContent() {
        return axios.get(API_URL + 'all');
    }

    getUserBoard() {
        return axios.get(API_URL + 'user', { headers: authHeader() });
    }

    getModeratorBoard() {
        return axios.get(API_URL + 'mod', { headers: authHeader() });
    }

    getAdminBoard() {
        return axios.get(API_URL + 'admin', { headers: authHeader() });
    }*/
}

export default new UserService();