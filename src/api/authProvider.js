import axiosClient from "./axiosClient";

const apiUrl = process.env.REACT_APP_BACKEND_URL

const authProvider = {
    signIn: async (nameOrEmail, password) => {
        try {
            const res = await axiosClient.post(`${apiUrl}/api/sign-in`, {
                nameOrEmail,
                password
                }, {
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            localStorage.setItem("accessToken", res.data.accessToken);

            return {
                body: res.data,
                status: res.status
            };

        } catch (e) {
            console.log(e.response);
            return {
                status: e.response.status,
                body: e.response.data
            }
        }
    },
    signUp: () => {

    },
    logout: () => {
        localStorage.removeItem('accessToken');
        return Promise.resolve()
    },
    isAuthorized: () => !!localStorage.getItem('accessToken'),
};

export default authProvider;