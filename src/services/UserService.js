import axios from "axios";
import data from "bootstrap/js/src/dom/data";

export default {
    sendCreateUserRequest(user) {
        let prefer;
        if (user.username === "error") {
            prefer = "code=400, example=error";
        } else {
            prefer = "code=200, example=default";
        }
        return axios.post("/user", user, {
            headers: {Prefer: prefer, Accept: "application/json"},
        });
    },

    checkUsername(username) {
        axios.get("/user/availability", {
            params: {username}
        });
        return !!data.available;
    },

    getUser(userId) {
        return axios.get("/user", {params: {userId}})
        .then(res => res.data?.data ?? res.data);
    },
};
