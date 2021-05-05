import axios from 'axios';
import getAuthHeader from './auth-header';

const API_URL = `${ process.env.REACT_APP_BASE_URL }/api/timetable`;

class TimetableService {
    createTimetable(scheduleInfo) {
        return axios.post(`${ API_URL }/create`, scheduleInfo, { headers: getAuthHeader() });
    }

    getTimetable(groupId) {
        return axios.get(`${ API_URL }/${ groupId }`, { headers: getAuthHeader() });
    }

    updateTimetable(timetableId, scheduleInfo) {
        return axios.put(`${ API_URL }/${ timetableId }`, scheduleInfo, { headers: getAuthHeader() });
    }
}

export default new TimetableService();