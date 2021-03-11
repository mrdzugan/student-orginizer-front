import axios from 'axios';

const API_URL = `${process.env.REACT_APP_BASE_URL}/api/`;

class FacultyService {
    async getFaculties() {
        return await axios.get(API_URL + 'faculties');
    }
}

export default new FacultyService();