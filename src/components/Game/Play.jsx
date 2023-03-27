import React, { useEffect, useState } from "react";
import Compare from "../../services/Compare";
import Countdown from "./Counter";
import { useNavigate } from "react-router-dom";
import Player from "./Player";
import { musicService } from "../../services/musicService";
import PlayVolume from "./PlayVolume";
import ProgressBar from "./ProgressBar";
import InteractiveResponse from "./InteractiveResponse";
import ButtonReturn from "./ButtonReturn";
import PlayButtons from "./PlayButtons";
import PlayInfo from "./PlayInfo";

export default function Play({
  searchResults,
  manageSearchBar,
  activateSearchBar,
  score,
  gameId,
  getScrore,
  id,
}) {
  const [display, setDisplay] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);
  const [progress, setProgress] = useState(0);
  const [displayDanger, setDisplayDanger] = useState(false);
  const [selectSong, setSelectSong] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);
  const [matchingResults, setMatchingResults] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [giveUp, setGiveUp] = useState(false);
  const [songFinished, setSongFinished] = useState(false);
  const [abandon, setAbandon] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const searchSongResult = `${searchResults.title} ${searchResults.artist}`;

    if (searchResults && selectSong) {
      const matchingResults = Compare(
        searchSongResult,
        selectSong.youtube_title
      );
      setMatchingResults(matchingResults);
      manageSearchBar(true);
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
    if (score <= 0) {
      alert("Vous avez perdu !");
      navigate("../choice");
    }
  }, [score]);

  async function chooseRandomSong() {
    const filteredData = await musicService(id);
    const randomIndex = Math.floor(Math.random() * filteredData.length);
    const randomSong = filteredData[randomIndex];
    setSelectSong(randomSong);
  }

  function launchPlayer() {
    setCurrentSong(selectSong);
    setMatchingResults(false);
    console.log(selectSong.youtube_title)
    manageSongDuration(22000);
    setSongFinished(false);
    if (currentSong) {
      const intervalId = setInterval(() => {
        setProgress((prevProgress) => prevProgress + 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }

  function stopPlayer() {
    setCurrentSong(null);
  }

  useEffect(() => { }, [matchingResults]);

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
      `${import.meta.env.VITE_BASE_URL}/games/${gameId}`,
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
  };

  function addPoints() {
    updateScore(score + 100);
  }

  function deletePoints() {
    updateScore(score - 10);
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
          <ButtonReturn />
          <div className="play__display">
            <PlayInfo selectSong={selectSong} score={score} giveUp={giveUp} />
            <ProgressBar progress={progress} />
            <InteractiveResponse
              displayDanger={displayDanger}
              displaySuccess={displaySuccess}
            />
            <PlayVolume setVolume={setVolume} volume={volume} />
          </div>
          <PlayButtons
            songFinished={songFinished}
            abandon={abandon}
            matchingResults={matchingResults}
            handleReplay={handleReplay}
            handleAbandon={handleAbandon}
          />
        </>
      )}
    </div>
  );
}
