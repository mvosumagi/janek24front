import axios from 'axios'

export default {
    sendSearchRequest(searchQuery) {

        //     return axios.get('services/search', {headers: {Prefer: prefer, Accept: 'application/json'}})
        // }
        // }
        return axios.get('services/search', {
            params: {
                q: searchQuery
            },

            headers: {
                Prefer: 'respond-async',
                Accept: 'application/json'
            }
        })}

    }