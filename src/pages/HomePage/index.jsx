import React, {useEffect, useState} from 'react';

import "./HomePage.scss";
import apiProvider from "../../api/apiProvider";

const Home = () => {

    const [users, setUsers] = useState(null);

    useEffect(() => {
        (async () => {
            const res = await apiProvider.getList("users");

            setUsers(res.body);
        })();
    }, [])

    return (
        <div>
            HomePage
            <ul>
                {(users || []).map(user => (
                    <li>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Home;