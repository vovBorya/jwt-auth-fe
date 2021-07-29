import React, {useState} from 'react';
import { TextField, RadioGroup, Radio, FormLabel, FormControlLabel } from "@material-ui/core";
import { Link, useHistory} from "react-router-dom";

import "./SignUp.scss";

const SignUp = () => {
    const history = useHistory();

    const [error, setError] = useState(null);
    const [roleValue, setRoleValue] = useState("user");
    const [ageValue, setAgeValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        setError(null);
        try {
            const res = await fetch("http://localhost:8080/api/sign-up", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    age: ageValue,
                    role: roleValue,
                    name: nameValue,
                    email: emailValue,
                    password: passwordValue
                })
            });

            if (res.status === 200) {
                history.push("/home")
            } else if (res.status === 409) {
                const { message } = await res.json();
                setError(message);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="sign-up-page">
            <form onSubmit={onSubmit} className="sign-up-page__form">
                <TextField
                    label="username"
                    id="login-input"
                    value={nameValue}
                    onChange={e => setNameValue(e.target.value)}
                    type="text"
                />
                <TextField
                    label="email"
                    id="password-input"
                    value={emailValue}
                    onChange={e => setEmailValue(e.target.value)}
                    type="email"
                />
                <TextField
                    label="password"
                    id="password-input"
                    value={passwordValue}
                    onChange={e => setPasswordValue(e.target.value)}
                    type="password"
                />

                <TextField
                    label="Age"
                    id="age-input"
                    value={ageValue}
                    onChange={e => setAgeValue(e.target.value)}
                    type="number"
                />

                <fieldset className="sign-up-page__radio-fieldset">
                    <FormLabel component="legend">Role</FormLabel>
                    <RadioGroup
                        aria-label="role"
                        name="role"
                        value={roleValue}
                        onChange={e => setRoleValue(e.target.value)}
                    >
                        <FormControlLabel value="user" control={<Radio />} label="User" />
                        <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                        <FormControlLabel value="moderator" control={<Radio />} label="Moderator" />
                    </RadioGroup>
                </fieldset>

                <button
                    type="submit"
                    disabled={!emailValue.length || !passwordValue.length || !nameValue}
                    className="sign-up-page__btn"
                >
                    Sign up
                </button>

                <Link
                    to="sign-in"
                    className="sign-in-page__sign-up-link"
                >
                    Sign in
                </Link>
            </form>
            {error && (
                <p className="sign-up-page__error-text">
                    {error}
                </p>
            )}
        </div>
    );
};

export default SignUp;