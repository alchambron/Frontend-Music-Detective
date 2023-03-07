import data from '../../data/70s.json'
import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';


export default function Play() {
    const [currentSong, setCurrentSong] = useState(null);
    const [progress, setProgress] = useState(0);

    const chooseRandomSong = () => {
        const randomIndex = Math.floor(Math.random() * data.items.length);
        setCurrentSong(data.items[randomIndex]);
    }

    const handleProgress = (state) => {
        const seconds = state.playedSeconds.toFixed(0);
        setProgress(seconds);
    }

    useEffect(() => {
        if (currentSong) {
            const intervalId = setInterval(() => {
                setProgress(prevProgress => prevProgress + 1);
            }, 1000);
            setTimeout(() => {
                clearInterval(intervalId);
                setProgress(0);
                setCurrentSong(null);
            }, 20000);
            return () => clearInterval(intervalId);
        }
    }, [currentSong]);

    return (
        <div>
            {/* ----------------------------------------------------------------------------------------------- */}
            <button onClick={chooseRandomSong}>Jouer !</button>
            {currentSong && (
                <div key={currentSong.snippet.resourceId.videoId}>
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${currentSong.snippet.resourceId.videoId}`}
                        playing={true}
                        onProgress={handleProgress}
                        style={{ margin: 'auto' }}
                        width='0'
                        height='0'
                    />
                    <progress value={progress} max='20' />
                </div>
            )}
        </div>
    );
}