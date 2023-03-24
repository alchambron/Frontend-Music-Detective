const checkEmail = (email, { setErrorMessage }) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
        setErrorMessage("");
        return true;
    }

    if (!emailRegex.test(email)) {
        setErrorMessage('Veuillez entrer une adresse email valide');
        return false;
    }
    setErrorMessage("")
    return true;
}

const checkPassword = (password, { setErrorMessage }) => {
    let errorMessage = '';

    if (password.length <= 6) {
        errorMessage = 'Le mot de passe doit contenir au moins 6 caractères';
        setErrorMessage(errorMessage);
        return false;
    }

    if (errorMessage !== '') {
        setErrorMessage(errorMessage);
        return false;
    }
    setErrorMessage("")
    return true;
}

export { checkEmail, checkPassword }
