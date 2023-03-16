import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Compare from "../services/Compare";
import Countdown from "./Counter";
import Vinyl from "./Vinyl";
import { NavLink, useNavigate } from "react-router-dom";

export default function Play({
  searchResults,
  manageSearchBar,
  activateSearchBar,
}) {
  const [display, setDisplay] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [displayDanger, setDisplayDanger] = useState(false);
  const [selectSong, setSelectSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [progress, setProgress] = useState(0);
  const [userChoice, setUserChoice] = useState("");
  const [matchingResults, setMatchingResults] = useState(false);
  const [volume, setVolume] = useState(0);
  const [points, setPoints] = useState(100);
  const [giveUp, setGiveUp] = useState(false);
  const [songFinished, setSongFinished] = useState(false);
  const navigate = useNavigate();

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
      if (!matchingResults) {
        setDisplayDanger(true);
        setTimeout(() => {
          setDisplayDanger(false);
        }, 3000);
      } else {
        setDisplaySuccess(true);
        setTimeout(() => {
          setDisplaySuccess(false);
        }, 5000);
      }
    }
  }, [searchResults]);

  useEffect(() => {
    if (matchingResults) {
      stopPlayer();
      addPoints();

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
      setProgress(0);
    }
  });

  useEffect(() => {
    if (points < 0) {
      alert("Vous avez perdu !");
      navigate("../choice");
    }
  }, [points]);

  async function chooseRandomSong() {
    console.log("choose");
    try {
      const playlistNumber = window.location.pathname.match(/\/(\d+)$/)[1];
      const apiURL =
        import.meta.env.VITE_BASE_URL +
        `/playlist_contents?playlist_id=${playlistNumber}`;
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
    setProgress(0);
    setTimeout(() => {
      NextSong();
    }, 5000);
  }

  return (
    <div className="play">
      <Countdown time={3} onFinish={handleCountdownFinish} />
      {display && (
        <>
          {currentSong && (
            <div className="player" key={currentSong.youtube_id}>
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
          <div className="leave">
            <NavLink to="/choice">
              <p>Retour</p>
            </NavLink>
          </div>
          <div className="play__display">
            <div className="play__display__infos">
              <p className="play__display__infos__points">
                Score : {points} points
              </p>
              {giveUp && (
                <p className="play__display__infos__answer">
                  Le titre de la musique est: {selectSong.youtube_title}
                </p>
              )}
            </div>
            <div className="play__display__elements">
              <h3>Musique en cours</h3>
              <progress
                className="play__display__elements__progress"
                value={progress}
                max="20"
              />
            </div>
            <div className="play__display__interactive">
              {displayDanger && (
                <div className="play__display__interactive__danger">
                  <p>Mauvaise réponse : Recommencer</p>
                </div>
              )}
              {displaySuccess && (
                <div className="play__display__interactive__success">
                  <p>Felicitation !</p>
                </div>
              )}
            </div>
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
          </div>
          <div className="play__buttons">
            {songFinished && (
              <button className="button-play" onClick={handleReplay}>
                Réécouter
              </button>
            )}
            {songFinished && (
              <button className="button-play" onClick={handleAbandon}>
                Réponse
              </button>
            )}
            {/* <button className="button-play" onClick={stopPlayer}>Stop</button> */}
          </div>
        </>
      )}
    </div>
  );
}
