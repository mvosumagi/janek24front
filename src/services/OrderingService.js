import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

export default {
    submit(orderDto, userId) {
        return axios.post(`${API_BASE_URL}/order?userId=${userId}`, orderDto);
    }
};
