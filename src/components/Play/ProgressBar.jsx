import React from "react";

export default function ProgressBar ({progress}) {
    return  (
        <div className="play__display__elements">
        <h3>Musique en cours</h3>
        <progress
          className="play__display__elements__progress"
          value={progress}
          max="18"
        />
      </div>
    );
}