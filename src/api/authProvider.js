const apiUrl = process.env.REACT_APP_BACKEND_URL

const authProvider = {
    signIn: async (nameOrEmail, password) => {
        try {
            const res = await fetch(`${apiUrl}/api/sign-in`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nameOrEmail,
                    password
                })
            });

            let body = null;
            try {
                body = await res.json();
                localStorage.setItem('accessToken', body.accessToken);
            } catch (e) {
                console.error(e)
            }

            return {
                body,
                status: res.status
            };
        } catch (e) {
            console.error(e);
        }
    },
    logout: () => {
        localStorage.removeItem('accessToken');
        return Promise.resolve()
    },
    isAuthorized: () => !!localStorage.getItem('token'),
};

export default authProvider;