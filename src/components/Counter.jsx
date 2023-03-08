import React, { useState, useEffect } from 'react';

export default function Counter() {
    const [countdown, setCountdown] = useState(3);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCountdown(countdown - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [countdown]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            chooseRandomSong();
        }, 3000);

        return () => clearTimeout(timeoutId);
    }, []);

    return (
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '5em' }}>
            {countdown === 0 ? '' : countdown}
        </div>
    );
}