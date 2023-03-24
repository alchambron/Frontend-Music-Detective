import React from "react";

export default function PlayVolume({ setVolume, volume }) {
    const handleVolumeChange = (event) => {
        setVolume(parseFloat(event.target.value));
    }

    return (
        <div className="play__display__volume">
            <h6>Volume</h6>
            <input
                className="play__display__volume__bar"
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
            />
        </div>
    );
}