import axios from 'axios';
import getAuthHeader from "./auth-header";

const API_URL = `${ process.env.REACT_APP_BASE_URL }/api`;

class FacultyService {
    async getFaculties() {
        return await axios.get(`${ API_URL }/faculties`);
    }

    async getFaculty(id) {
        return await axios.get(`${ API_URL }/faculties/${ id }`, { headers: getAuthHeader() })
    }
}

export default new FacultyService();