import axios from "axios";

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
    async checkUsername(username) {
        const {data} = await axios.get("/user/availability", {
            params: {username}
        });
        return !!data.available;
    }
};

