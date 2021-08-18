import React, {useState} from 'react';
import { TextField, RadioGroup, Radio, FormLabel, FormControlLabel } from "@material-ui/core";
import { Link, useHistory} from "react-router-dom";

import Button from "../../components/Button";

import "./SignUp.scss";
import ErrorText from "../../components/ErrorText";

const SignUp = () => {
    const history = useHistory();

    const [errorText, setErrorText] = useState(null);
    const [roleValue, setRoleValue] = useState("user");
    const [ageValue, setAgeValue] = useState("");
    const [nameValue, setNameValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");

    const onSubmit = async e => {
        e.preventDefault();
        setErrorText(null);
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
                setErrorText(message);
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

                <Button
                    type="submit"
                    label="Sign up"
                    fullWidth
                    variant="secondary"
                    disabled={!emailValue.length || !passwordValue.length || !nameValue}
                />

                <Link
                    to="sign-in"
                    className="sign-in-page__sign-up-link"
                >
                    Sign in
                </Link>
            </form>
            {errorText && <ErrorText text={errorText}/>}
        </div>
    );
};

export default SignUp;