import axios from 'axios'

export default {
    sendSearchRequest(partialDescription) {

        return axios.get('services', {
            params: {
                partialDescription : partialDescription
            },

            headers: {
                Prefer: 'respond-async',
                Accept: 'application/json'
            }
        })}

    }