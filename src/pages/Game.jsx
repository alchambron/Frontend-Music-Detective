import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Play from "../components/Game/Play";
import SearchBar from "../components/Game/SearchBar";

export default function Game() {
  const { gameId, id } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [score, setScore] = useState();
  const [searchBarReset, setSearchBarReset] = useState(false);
  const [display, setDisplay] = useState(false);

  function handleDisplaySearchBar(e) {
    setDisplay(e);
  }
  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  function handleResetSearchBar(e) {
    setSearchBarReset(e);
    setTimeout(() => {
      setSearchBarReset(false);
    }, 2000);
  }

  const getScrore = async () => {
    if (gameId) {
      const resp = await fetch(
        `${import.meta.env.VITE_BASE_URL}/games/${gameId}`
      );
      const game = await resp.json();
      setScore(game.score);
    }
  };

  useEffect(() => {
    getScrore();
  }, []);

  return (
    <>
      <div className="game">
        <Play
          searchResults={searchResults}
          manageSearchBar={(e) => handleResetSearchBar(e)}
          activateSearchBar={(e) => handleDisplaySearchBar(e)}
          score={score}
          id={id}
          setScore={setScore}
          gameId={gameId}
          getScrore={getScrore}
        />
        {display && (
          <SearchBar
            onSearchResults={handleSearchResults}
            searchBarReset={searchBarReset}
          />
        )}
      </div>
      <div className="orange-background"></div>
    </>
  );
}
