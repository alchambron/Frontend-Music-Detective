import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Compare from "../services/Compare";
import Countdown from "./Counter";
import Vinyl from "./Vinyl";

export default function Play({
  searchResults,
  manageSearchBar,
  activateSearchBar,
}) {
  const [display, setDisplay] = useState(false);
  const [selectSong, setSelectSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [userChoice, setUserChoice] = useState("");
  const [matchingResults, setMatchingResults] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [points, setPoints] = useState(100);
  const [giveUp, setGiveUp] = useState(false);
  const [songFinished, setSongFinished] = useState(false);

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
    } catch (error) {
      console.error(error);
    }
  }

  function launchPlayer() {
    setCurrentSong(selectSong);
    setMatchingResults(false);
    console.log(selectSong.youtube_title);
    manageSongDuration(22000);
    setSongFinished(false);
    if (currentSong) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);
      }, 1000);
      console.log(currentSong);
      return () => clearInterval(intervalId);
    }
  }

  function stopPlayer() {
    setCurrentSong(null);
  }

  function manageSongDuration(time) {
    setTimeout(() => {
      setSongFinished(true);
      stopPlayer();
    }, time);
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
      addPoints();
      alert("Attention son suivant !");

      setTimeout(() => {
        NextSong();
      }, 5000);
    }
  }, [matchingResults]);

  useEffect(() => {
    if (selectSong) {
      launchPlayer();
    }
  }, [selectSong]);

  useEffect(() => {
    if (songFinished) {
      setProgress(0)
    }
  })

  function handleCountdownFinish() {
    chooseRandomSong();
    activateSearchBar(true);
    setDisplay(true);
    if (selectSong) {
      launchPlayer();
    }
  }

  function handleReplay() {
    deletePoints();
    stopPlayer();
    setTimeout(() => {
      launchPlayer();
    }, 2000);
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

  function NextSong() {
    setGiveUp(false);
    chooseRandomSong();
    manageSearchBar(true);
    if (!matchingResults) {
      deletePoints();
    }
  }
  function handleAbandon() {
    setGiveUp(true);
    stopPlayer();
    deletePoints();
    setTimeout(() => {
      NextSong();
    }, 5000);
  }
  function handleLeave() {
    stopPlayer();
    window.location.href = "/choice";
  }

  return (
    <div className="play">
      <Countdown time={3} onFinish={handleCountdownFinish} />
      {display && (
        <div>
          <Vinyl />
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
            </div>
          )}
          <div><input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
            <progress value={progress} max="20" />
          </div>
          <>
            {songFinished && <button onClick={handleReplay}>Replay</button>}

            <button onClick={stopPlayer}>STOP</button>
            <button onClick={handleAbandon}>ABANDONNER</button>
            <button onClick={handleLeave}>QUITTER</button>
            {matchingResults && <p>Felicitation</p>}
            {giveUp && (
              <p>Le titre de la musique est: {selectSong.youtube_title}</p>
            )}
            <p>Vous avez: {points} points/100</p>
          </>
        </div>
      )}
    </div>
  );
}
