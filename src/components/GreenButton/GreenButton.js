import React from 'react';
import './greenButton.css';

export function GreenButton(props) {
    const {children, disabled, ...rest} = props;

    return (
        <button className={`green_button ${disabled && 'disabled'}`} {...rest}>
            {children}
        </button>
    );
}
