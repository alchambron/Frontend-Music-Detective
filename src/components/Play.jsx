import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Compare from "../services/Compare";
import Countdown from "./Counter";
import Vinyl from "./Vinyl";

export default function Play({ searchResults, manageSearchBar }) {
  const [selectSong, setSelectSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [userChoice, setUserChoice] = useState("");
  const [matchingResults, setMatchingResults] = useState(false);
  const [volume, setVolume] = useState(0.5);

  async function chooseRandomSong() {
    console.log("choose");
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
      setSelectSong(randomSong);
      console.log(selectSong)
    } catch (error) {
      console.error(error);
    }
  }

  function launchPlayer() {
    setCurrentSong(selectSong);
    manageSongDuration(20000);
    if (currentSong) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }

  function manageSongDuration(time) {
    setTimeout(() => {
      stopPlayer();
    }, time);
  }

  function stopPlayer() {
    setCurrentSong(null);
  }

  useEffect(() => {
    const searchSongResult = `${searchResults.title} ${searchResults.artist}`;

    if (searchResults && selectSong) {
      const matchingResults = Compare(
        searchSongResult,
        selectSong.youtube_title
      );
      setUserChoice(searchSongResult);
      setMatchingResults(matchingResults);
      manageSearchBar(true);
      console.log(matchingResults);
    }
  }, [searchResults]);

  useEffect(() => {
    if (matchingResults) {
      stopPlayer();
    }
  }, [matchingResults]);

  useEffect(() => {
    if (selectSong) {
      setCurrentSong(selectSong);
    }
  }, [selectSong]);

  function handleCountdownFinish() {
    chooseRandomSong();
    if (selectSong) {
      launchPlayer();
    }
  }

  function handleReplay() {
    stopPlayer();
    setTimeout(() => {
      launchPlayer();
    }, 100);
  }

  function handleProgress(state) {
    const seconds = state.playedSeconds.toFixed(0);
    setProgress(seconds);
  }

  function handleVolumeChange(event) {
    setVolume(parseFloat(event.target.value));
  }

  function handleNextSong() {
    chooseRandomSong();
    manageSearchBar(true);
  }

  return (
    <div className="play">
      <Countdown time={3} onFinish={handleCountdownFinish} />
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
          <Vinyl />
        </div>
      )}{" "}
      <>
        <button onClick={handleNextSong}>Suivant</button>
        <button onClick={handleReplay}>Replay</button>
        <button onClick={launchPlayer}>Launch</button>
        <button onClick={stopPlayer}>STOP</button>
        <p>Votre derniere réponse : {userChoice}</p>
      </>
      {matchingResults && <p>Felicitation</p>}
    </div>
  );
}
