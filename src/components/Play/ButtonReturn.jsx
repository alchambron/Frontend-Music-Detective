import React from "react";
import { NavLink } from "react-router-dom";

export default function ButtonReturn() {
    return (
        <div className="leave">
            <NavLink to="/choice">
                <p>Retour</p>
            </NavLink>
        </div>
    );
}