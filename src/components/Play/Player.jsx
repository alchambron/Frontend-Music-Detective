import ReactPlayer from "react-player";
import React, {  useEffect } from "react";

export default function Player({currentSong, volume, songFinished, setProgress}) {

  function handleProgress(state) {
    const seconds = state.playedSeconds.toFixed(0);
    setProgress(seconds);
  }

  useEffect(() => {
    if (songFinished) {
      setProgress(0);
    }
  });

  return (
    <div className="player" key={currentSong.youtube_id}>
      <ReactPlayer
        url={`https://www.youtube.com/watch?v=${currentSong.youtube_id}`}
        playing={true}
        autoPlay
        playsinline={true}
        onProgress={handleProgress}
        style={{ margin: "auto" }}
        width="0"
        height="0"
        volume={volume}
      />
    </div>
  );
}
