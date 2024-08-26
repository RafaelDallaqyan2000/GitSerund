import React from "react";
import "./CircularLoading.css";
import loaderGrey from '../../img/loaderOnScroll.svg';
import loaderWhite from '../../img/loader-white.svg';

export function CircularLoading({whiteIcon}) {
    return (
        <div className="circular_loading_container">
            <img
                className="rotate_loading"
                src={whiteIcon ? loaderWhite : loaderGrey}
            />
        </div>
    )
}
