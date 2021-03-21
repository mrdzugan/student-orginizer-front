import axios from 'axios';
import authHeader from './auth-header';

const API_URL = `${ process.env.REACT_APP_BASE_URL }/api/group`;

class GroupService {
    createGroup(groupInfo) {
        return axios.post(`${ API_URL }/create`, groupInfo, { headers: authHeader() });
    }

    getGroup(groupId) {
        return axios.get(`${ API_URL }/${ groupId }`, { headers: authHeader() });
    }
}

export default new GroupService();