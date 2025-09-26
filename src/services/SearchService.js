import axios from 'axios'

export default {

    sendSearchRequest(partialDescription) {

        return axios.get('/services/search', {
            params: {
                partialDescription: partialDescription
            }
        })
    }

}