import React from "react";

export default function PlayInfo({ selectSong, score, giveUp }) {
    return (
        <div className="play__display__infos">
            <p className="play__display__infos__points">
                Score : {score} points
            </p>
            {giveUp && (
                <p className="play__display__infos__answer">
                    Le titre de la musique est: {selectSong.youtube_title}
                </p>
            )}
        </div>
    );
}