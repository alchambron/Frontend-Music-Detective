import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MyAccount() {
    return (
        <div>
            <h1>Mon compte</h1>
            <NavLink to="/register">
                <button>Sign up</button>
            </NavLink>
            <NavLink to="/login">
                <button>Login</button>
            </NavLink>
        </div>
    )
}