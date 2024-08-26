import {useEffect} from 'react';

export function useOutsideClick(ref, callback, parent = document) {
    const handleClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            callback(e);
        }
    };
    useEffect(() => {
        parent.addEventListener("click", handleClick);
        return () => {
            parent.removeEventListener("click", handleClick);
        };
    },[]);
}
