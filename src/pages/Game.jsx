import React, { useState, useEffect } from "react";
import { json, useParams } from 'react-router-dom';
import Play from "../components/Play";
import SearchBar from "../components/SearchBar";

export default function Game() {
  const { scoreId, id } = useParams();
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
    if (scoreId) {
      const resp = await fetch(`http://localhost:3000/games/${scoreId}`);
      const game = await resp.json()
      setScore(game.score)
    }
  }


  useEffect(() => {
    getScrore()
  }, [])

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
          scoreId={scoreId}
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
