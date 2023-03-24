import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function LoggedUser() {
    const [userLoggedIn, setUserLoggedIn] = useState(false);

    const loggedUser = useSelector((state) => {
        return state.user;
    });

    useEffect(() => {
        if (loggedUser?.id) {
            setUserLoggedIn(true);
        } else {
            setUserLoggedIn(false);
        }
    }, [loggedUser]);

    return userLoggedIn;
}