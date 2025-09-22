import axios from "axios";

export default {

    sendLoginRequest(username, password) {
        let prefer
        if (username === 'error') {
            prefer = 'code=403, example=error';
        } else if (username === 'admin') {
            prefer = 'code=200, example=admin';
        } else {
            prefer = 'code=200, example=rain';
        }

        return axios.get('/login', {
            params: {
                username: username,
                password: password
            },
            headers: {Prefer: prefer, Accept: 'application/json'}
        })
    }
}