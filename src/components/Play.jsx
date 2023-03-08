import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';

export default function Play({ searchResults }) {
    const [currentSong, setCurrentSong] = useState(null);
    const [progress, setProgress] = useState(0);
    const [title, setTitle] = useState('');
    const [artist, setArtist] = useState('');

    const chooseRandomSong = async () => {
        try {
            const playlistNumber = window.location.pathname.match(/\/(\d+)$/)[1];
            const apiURL = `https://musicdetective.herokuapp.com/playlist_contents?playlist_id=${playlistNumber}`;
            const response = await fetch(apiURL);
            const data = await response.json();
            const filteredData = data.filter(item => item.playlist_id === parseInt(playlistNumber));
            const randomIndex = Math.floor(Math.random() * filteredData.length);
            const randomSong = filteredData[randomIndex];
            setCurrentSong(randomSong);
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
    const searchSongResult =`${searchResults.title} ${searchResults.artist}`

    if (searchResults && currentSong ) {
      const matchingResults = compare(searchResults, currentSong);
      setMatchingResults(matchingResults);
    }
  }, [searchResults, currentSong]);
console.log(searchResults)
console.log(currentSong)
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
          />
          <progress value={progress} max="20" />
        </div>
      )}
      {title} - {artist}
      {matchingResults && <p>Les résultats correspondent !</p>}
    </div>
  );
}
