import React, {useEffect, useRef} from "react";
import "./PopupPassword.css";

const PopupPassword = (props) => {
    const popupRef = useRef();

    function useOutsideClick(ref, callback) {
        const handleClick = (e) => {
            if (ref.current?.contains(e.target)) {
            } else {
                callback();
            }
        };
        useEffect(() => {
            document.addEventListener("click", handleClick);
            return () => {
                document.removeEventListener("click", handleClick);
            };
        });
    }

    useOutsideClick(popupRef, props.func);

    return (
        <div className="popup-box">
            <div className="box" ref={popupRef}>
                {props.deleteIcon ? null : (
                    <span className="close-icon" onClick={props.handleClose}>
            <svg
                width="12.5"
                height="12.5"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
              <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.84367 5.56042L11.9767 0.427349C12.3311 0.072984 12.9056 0.0729847 13.26 0.427349C13.6144 0.781714 13.6144 1.35625 13.26 1.71062L8.12693 6.84369L13.26 11.9768C13.6144 12.3311 13.6144 12.9057 13.26 13.26C12.9056 13.6144 12.3311 13.6144 11.9767 13.26L6.84367 8.12696L1.71059 13.26C1.35623 13.6144 0.781691 13.6144 0.427326 13.26C0.0729614 12.9057 0.0729612 12.3311 0.427326 11.9768L5.5604 6.84369L0.427326 1.71062C0.072961 1.35625 0.0729614 0.781714 0.427326 0.427349C0.781691 0.0729847 1.35623 0.0729845 1.71059 0.427349L6.84367 5.56042Z"
                  fill="black"
                  stroke="white"
                  strokeWidth="0.3"
              />
            </svg>
          </span>
                )}
                {props.content}
            </div>
        </div>
    );
};

export default PopupPassword;
