import axios from "axios";

export default {
    async list(receiverUserId, page = 0, size = 20) {
        const {data} = await axios.get("/api/inbox", {params: {receiverUserId, page, size}});
        return Array.isArray(data) ? data : (data.content || []);
    },
    composeUsernames({from, to, cc, subject, body}) {
        return axios.post("/api/inbox/compose-usernames", {from, to, cc, subject, body}, {
            headers: {Accept: "application/json"}
        });
    },
    updateStatus(id, receiverUserId, status) {
        return axios.put(`/api/inbox/${id}/status`, {status}, {
            params: {receiverUserId},
            headers: {Accept: "application/json"}
        });
    },
    async unreadCount(receiverUserId) {
        const {data} = await axios.get("/api/inbox/unread-count", {params: {receiverUserId}});
        return data?.count ?? 0;
    }
};
