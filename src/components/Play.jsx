import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Compare from "../services/Compare";
import Countdown from "./Counter";
import Vinyl from "./Vinyl";

export default function Play({ searchResults }) {
  const [selectSong, setSelectSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [matchingResults, setMatchingResults] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [points, setPoints] = useState(100);

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
      setNewRound(false);
    } catch (error) {
      console.error(error);
    }
  }

  function launchPlayer() {
    console.log("heeuuuuu");
    console.log(selectSong);
    setCurrentSong(selectSong);
    manageSongDuration(20000);
    if (currentSong) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);
      }, 1000);
      console.log(currentSong);
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
      setMatchingResults(matchingResults);

      console.log(matchingResults);
    }
  }, [searchResults, selectSong]);

  useEffect(() => {
    if (matchingResults) {
      stopPlayer();
      addPoints();
    }
  }, [matchingResults]);

  function handleCountdownFinish() {
    chooseRandomSong();
  }

  function handleReplay() {
    stopPlayer();
    setTimeout(() => {
      launchPlayer();
    }, 100);
    deletePoints();
  }

  useEffect(() => {
    if (points < 0) {
      alert("Vous avez perdu !");
      window.location.href = "/choice";
    }
  }, [points]);

  function addPoints() {
    setPoints(points + 20);
  }

  function deletePoints() {
    setPoints(points - 5);
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
    if (!matchingResults) {
      deletePoints();
    }
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
      </>
      {matchingResults && <p>Felicitation</p>}
      <p>Vous avez: {points} points/100</p>
    </div>
  );
}
