import React from 'react';

import "./Button.scss";

const Button = ({ onClick, className, fullWidth, variant, label, ...restProps }) => (
    <button
        onClick={onClick}
        className={`btn ${variant} ${fullWidth && "fullWidth"} ${className}`}
        {...restProps}
    >
        {label}
    </button>
);

export default Button;