import axios from 'axios';
import getAuthHeader from "./auth-header";

const API_URL = `${ process.env.REACT_APP_BASE_URL }/api`;

class AdvertisementService {
    async getAdvertisements() {
        return await axios.get(`${ API_URL }/advertisements`, { headers: getAuthHeader() });
    }

    async createAdvertisement(data) {
        return await axios.post(`${ API_URL }/advertisements/create`, data,{ headers: getAuthHeader() });
    }

    async updateAdvertisement(id, data) {
        return await axios.put(`${ API_URL }/advertisements/${ id }`, data, { headers: getAuthHeader() });
    }
}

export default new AdvertisementService();