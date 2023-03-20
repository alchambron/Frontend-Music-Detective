import React, { useState, useEffect } from "react";
import Compare from "../services/Compare";
import Countdown from "./Counter";
import { NavLink, useNavigate } from "react-router-dom";
import Player from "./Play/Player";
import musicService from "../services/musicService";

export default function Play({
  searchResults,
  manageSearchBar,
  activateSearchBar,
  score,
  scoreId,
  getScrore,
  id,
}) {
  const [display, setDisplay] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayDanger, setDisplayDanger] = useState(false);
  const [selectSong, setSelectSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [userChoice, setUserChoice] = useState("");
  const [matchingResults, setMatchingResults] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [points, setPoints] = useState(100);
  const [giveUp, setGiveUp] = useState(false);
  const [songFinished, setSongFinished] = useState(false);
  const navigate = useNavigate();
  const [abandon, setAbandon] = useState(false);

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
        }, 2000);
      } else {
        setDisplaySuccess(true);
        setDisplayDanger(false);
        stopPlayer();
        addPoints();
        setTimeout(() => {
          setDisplaySuccess(false);
          NextSong();
        }, 2000);
      }
    }
  }, [searchResults]);

  useEffect(() => {
    if (selectSong) {
      launchPlayer();
    }
  }, [selectSong]);

  useEffect(() => {
    if (points < 0) {
      alert("Vous avez perdu !");
      navigate("../choice");
    }
  }, [points]);

  async function chooseRandomSong() {
    const filteredData = await musicService(id);
    console.log(filteredData)
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    const randomSong = filteredData[randomIndex];
    setSelectSong(randomSong);
    console.log(randomSong);
  }

  function launchPlayer() {
    setCurrentSong(selectSong);
    setMatchingResults(false);
    // console.log(selectSong.youtube_title);
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
    launchPlayer();
  }

  const updateScore = async (pointNumber) => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}games/${scoreId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: pointNumber.toString() }),
      }
    );
    const score = await response.json();
    getScrore();
    console.log(score);
  };

  function addPoints() {
    updateScore(score + 100);
  }

  function deletePoints() {
    updateScore(score - 10);
  }

  function handleVolumeChange(event) {
    setVolume(parseFloat(event.target.value));
  }

  function handleReplay() {
    stopPlayer();
    launchPlayer();
  }

  function NextSong() {
    setGiveUp(false);
    chooseRandomSong();
    manageSearchBar(true);
    setAbandon(false);
  }
  function handleAbandon() {
    setAbandon(true);
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
            <Player
              currentSong={currentSong}
              volume={volume}
              songFinished={songFinished}
              setProgress={setProgress}
            />
          )}

          <div className="leave">
            <NavLink to="/choice">
              <p>Retour</p>
            </NavLink>
          </div>
          <div className="play__display">
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
            {songFinished && !abandon && !matchingResults && (
              <button className="button-play" onClick={handleReplay}>
                Réécouter
              </button>
            )}

            {songFinished && !matchingResults && !abandon && (
              <button className="button-play" onClick={handleAbandon}>
                Réponse
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}
