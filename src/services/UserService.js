import axios from "axios";

export default {

    sendCreateUserRequest(user) {
        return axios.put('/user',user)
    }
}