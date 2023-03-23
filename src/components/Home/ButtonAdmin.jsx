import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonAdmin() {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/admin");
    };
    return (
        <div>
            <button onClick={handleClick}>Page Admin</button>
        </div>
    );
}