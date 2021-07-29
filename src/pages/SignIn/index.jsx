import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom";
import { TextField } from '@material-ui/core';

import authProvider from "../../api/authProvider";

import "./SignIn.scss";

const SignIn = ({ setIsAuthorized }) => {

    const history = useHistory();

    const [errorText, setErrorText] = useState(null);
    const [nameOrEmailValue, setNameOrEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        setErrorText(null);

        const { body, status } = await authProvider.signIn(nameOrEmailValue, passwordValue);

        if (status === 200) {
            history.push("/home");
            setIsAuthorized(true);
        } else if (status === 404 || status === 401) {
            setErrorText(body.message);
        }
    };

    return (
        <div className="sign-in-page">
            <form onSubmit={onSubmit} className="sign-in-page__form">
                <TextField
                    label="username or email"
                    id="login-input"
                    value={nameOrEmailValue}
                    onChange={e => setNameOrEmailValue(e.target.value)}
                    type="text"
                />
                <TextField
                    label="password"
                    id="password-input"
                    value={passwordValue}
                    onChange={e => setPasswordValue(e.target.value)}
                    type="password"
                />

                <button
                    type="submit"
                    disabled={!nameOrEmailValue.length || !passwordValue.length}
                    className="sign-in-page__btn sign-in-page__btn"
                >
                    Sign in
                </button>

                <Link
                    to="sign-up"
                    className="sign-in-page__sign-up-link"
                >
                    Sign up
                </Link>
            </form>

            {errorText && (
                <p className="sign-in-page__error-text">
                    {errorText}
                </p>
            )}
        </div>
    );
};

export default SignIn;
