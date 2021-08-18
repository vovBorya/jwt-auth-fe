import axiosClient from "./axiosClient";

export const apiProvider = {
    getList: async (resource) => {
        const res = await axiosClient.get(`/api/${resource}`);
        if (res.status === 403) {
            window.location.href = "/sign-in";
        }
        return {
            body: res.data,
            status: res.status
        };
    }
}

export default apiProvider;