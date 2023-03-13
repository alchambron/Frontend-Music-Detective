import React from 'react'
import { NavLink } from 'react-router-dom'


export default function ButtonMyAccount() {
    return (
        <div className='button-my-account'>
            <NavLink to="/myaccount">
                <button>My account</button>
            </NavLink>
        </div>
    )
}