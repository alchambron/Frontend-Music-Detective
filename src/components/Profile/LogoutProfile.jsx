import React from 'react'

export default function LogoutProfile({handleClickLogOut}) {
    return (
        <div>
            <button onClick={handleClickLogOut}>Log out</button>
        </div>
    )
}