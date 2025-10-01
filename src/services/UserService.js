import axios from "axios";

export default {
    sendCreateUserRequest(username, password, user) {
        return axios.post("/user", user, {
            params: {
                username: username,
                password: password
            }
        });
    },

    getUser(userId) {
        return axios.get("/user", {params: {userId}})
            .then(res => res.data?.data ?? res.data);
    },

    sendPutUpdateUserRequest(userId, user) {
        return axios.put('/user', user, {
            params: {
                userId: userId
            }
        })
    },

    changePassword(userId, newPassword) {
        return axios.put('/password', {
            userId: userId,
            newPassword: newPassword
        })
            .then(response => response.data);
    }


};
