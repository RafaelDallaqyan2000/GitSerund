import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function Redirect({ to }) {
    let navigate = useNavigate();

    useEffect(() => {
        navigate(to);
    });

    return null;
}
