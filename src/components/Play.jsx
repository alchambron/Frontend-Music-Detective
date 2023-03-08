import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Compare from "../services/Compare";

export default function Play({ searchResults }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [matchingResults, setMatchingResults] = useState(false);
const [volume, setVolume]= useState(0.5);

  const [songResult, setSongResult] = useState("")

  const chooseRandomSong = async () => {
    try {
      const playlistNumber = window.location.pathname.match(/\/(\d+)$/)[1];
      const apiURL = `https://musicdetective.herokuapp.com/playlist_contents?playlist_id=${playlistNumber}`;
      const response = await fetch(apiURL);
      const data = await response.json();
      const filteredData = data.filter(
        (item) => item.playlist_id === parseInt(playlistNumber)
      );
      const randomIndex = Math.floor(Math.random() * filteredData.length);
      const randomSong = filteredData[randomIndex];
      setCurrentSong(randomSong);
      setSongResult(randomSong)
    } catch (error) {
      console.error(error);
    }
  };

  const handleProgress = (state) => {
    const seconds = state.playedSeconds.toFixed(0);
    setProgress(seconds);
  };

  useEffect(() => {
    setTitle(searchResults.title);
    setArtist(searchResults.artist);
  }, [searchResults]);

  useEffect(() => {
    if (currentSong) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);
      }, 1000);
      setTimeout(() => {
        clearInterval(intervalId);
        setProgress(0);
        setCurrentSong(null);
      }, 20000);
      return () => clearInterval(intervalId);
    }
  }, [currentSong]);

  useEffect(() => {
    const searchSongResult = `${searchResults.title} ${searchResults.artist}`;

    if (searchResults && songResult) {
      const matchingResults = Compare(
        searchSongResult,
        songResult.youtube_title
      );
      setMatchingResults(matchingResults);
      console.log(matchingResults);
    }
  }, [searchResults, songResult]);


  const handleVolumeChange = (event) => {
    setVolume(parseFloat(event.target.value));
  };


  return (
    <div className="play">
      <button onClick={chooseRandomSong}>Jouer !</button>
      {currentSong && (
        <div key={currentSong.youtube_id}>
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${currentSong.youtube_id}`}
            playing={true}
            onProgress={handleProgress}
            style={{ margin: "auto" }}
            width="0"
            height="0"
            volume={volume}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
          <progress value={progress} max="20" />
        </div>
      )}
      {title} - {artist}
      {matchingResults && <p>Les résultats correspondent !</p>}
    </div>
  );
}
