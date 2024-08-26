import React from 'react';
import './greyButton.css';

export function GreyButton(props) {
    const {children, ...rest} = props;

    return (
        <button className='grey_button' {...rest}>
            {children}
        </button>
    );
}