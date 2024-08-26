import React from 'react';
import './Switch.css';
import classNames from "classnames";

export function Switch(props) {
    const {
        text,
        isOn,
        onSwitchClick = () => {},
        item,
    } = props;

    return (
        <div
            className='switch_wrapper'
            onClick={() => onSwitchClick(item)}
        >
            <div
                className={classNames(
                    'switch_body',
                    {on: isOn}
                )}
            >
                <div className="switch_circle"></div>
            </div>
            <p className="switch_text">{text}</p>
        </div>
    );
}
