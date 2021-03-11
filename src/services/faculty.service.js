import axios from 'axios';

const API_URL = 'http://192.168.88.150:8000/api/';

class FacultyService {
    async getFaculties() {
        return await axios.get(API_URL + 'faculties');
    }
}

export default new FacultyService();